import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from './config';
import { insertSupabaseOrder, insertSupabaseAppointment } from '../lib/supabase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export type OrderStatus = 'received' | 'in_production' | 'ready' | 'completed' | 'cancelled';
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

export interface CustomerOrder {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  deliveryLocation?: string;
  productName: string;
  size: string;
  leatherType?: string;
  customNotes?: string;
  status: OrderStatus;
  createdAt?: Timestamp | Date | string;
}

export interface WorkshopAppointment {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot?: string;
  purpose: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt?: Timestamp | Date | string;
}

// Generate valid alphanumeric ID
function generateId(prefix: string): string {
  const randomStr = Math.random().toString(36).substring(2, 10);
  const timeStr = Date.now().toString(36);
  return `${prefix}_${timeStr}_${randomStr}`;
}

/**
 * Creates a new customer shoe order in Firestore.
 */
export async function createCustomerOrder(data: {
  fullName: string;
  phone: string;
  email?: string;
  deliveryLocation?: string;
  productName: string;
  size: string;
  leatherType?: string;
  customNotes?: string;
}): Promise<string> {
  const orderId = generateId('ord');
  const path = `orders/${orderId}`;

  const payload: Record<string, unknown> = {
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    productName: data.productName.trim(),
    size: data.size.trim(),
    status: 'received' as OrderStatus,
    createdAt: serverTimestamp(),
  };

  if (data.email && data.email.trim()) {
    payload.email = data.email.trim();
  }
  if (data.deliveryLocation && data.deliveryLocation.trim()) {
    payload.deliveryLocation = data.deliveryLocation.trim();
  }
  if (data.leatherType && data.leatherType.trim()) {
    payload.leatherType = data.leatherType.trim();
  }
  if (data.customNotes && data.customNotes.trim()) {
    payload.customNotes = data.customNotes.trim();
  }

  try {
    const docRef = doc(db, 'orders', orderId);
    await setDoc(docRef, payload);

    // Asynchronously dispatch to Supabase and REST backend API
    insertSupabaseOrder(data).catch(() => {});
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {});

    return orderId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Creates a workshop appointment in Firestore.
 */
export async function createWorkshopAppointment(data: {
  fullName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot?: string;
  purpose: string;
  notes?: string;
}): Promise<string> {
  const apptId = generateId('apt');
  const path = `appointments/${apptId}`;

  const payload: Record<string, unknown> = {
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    date: data.date.trim(),
    purpose: data.purpose.trim(),
    status: 'scheduled' as AppointmentStatus,
    createdAt: serverTimestamp(),
  };

  if (data.email && data.email.trim()) {
    payload.email = data.email.trim();
  }
  if (data.timeSlot && data.timeSlot.trim()) {
    payload.timeSlot = data.timeSlot.trim();
  }
  if (data.notes && data.notes.trim()) {
    payload.notes = data.notes.trim();
  }

  try {
    const docRef = doc(db, 'appointments', apptId);
    await setDoc(docRef, payload);

    // Asynchronously dispatch to Supabase and REST backend API
    insertSupabaseAppointment(data).catch(() => {});
    fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {});

    return apptId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Subscribes to real-time orders (for workshop admin).
 */
export function subscribeToOrders(
  onData: (orders: CustomerOrder[]) => void,
  onError?: (error: Error) => void
): () => void {
  const collectionPath = 'orders';
  const q = query(collection(db, collectionPath), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const orders: CustomerOrder[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<CustomerOrder, 'id'>),
      }));
      onData(orders);
    },
    (error) => {
      if (onError) {
        onError(error instanceof Error ? error : new Error(String(error)));
      } else {
        handleFirestoreError(error, OperationType.GET, collectionPath);
      }
    }
  );
}

/**
 * Subscribes to real-time appointments (for workshop admin).
 */
export function subscribeToAppointments(
  onData: (appts: WorkshopAppointment[]) => void,
  onError?: (error: Error) => void
): () => void {
  const collectionPath = 'appointments';
  const q = query(collection(db, collectionPath), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const appts: WorkshopAppointment[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<WorkshopAppointment, 'id'>),
      }));
      onData(appts);
    },
    (error) => {
      if (onError) {
        onError(error instanceof Error ? error : new Error(String(error)));
      } else {
        handleFirestoreError(error, OperationType.GET, collectionPath);
      }
    }
  );
}

/**
 * Admin updates order status
 */
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  const path = `orders/${orderId}`;
  try {
    const docRef = doc(db, 'orders', orderId);
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Admin updates appointment status
 */
export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus
): Promise<void> {
  const path = `appointments/${appointmentId}`;
  try {
    const docRef = doc(db, 'appointments', appointmentId);
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Admin deletes an order
 */
export async function deleteCustomerOrder(orderId: string): Promise<void> {
  const path = `orders/${orderId}`;
  try {
    const docRef = doc(db, 'orders', orderId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
