import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  Shield,
  LogIn,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  Phone,
  MapPin,
  Calendar,
  Layers,
  ShoppingBag,
  ExternalLink,
  Copy,
  Check,
  Server,
  Code2,
} from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';
import { ADMIN_EMAIL } from '../firebase/config';
import { isSupabaseConfigured, SUPABASE_SQL_SCHEMA } from '../lib/supabase';
import {
  CustomerOrder,
  WorkshopAppointment,
  OrderStatus,
  AppointmentStatus,
  subscribeToOrders,
  subscribeToAppointments,
  updateOrderStatus,
  updateAppointmentStatus,
} from '../firebase/firestoreService';

interface AtelierDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AtelierDatabaseModal: React.FC<AtelierDatabaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, isAdmin, loading: authLoading, signInWithGoogle, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'appointments' | 'backend'>('orders');
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [appointments, setAppointments] = useState<WorkshopAppointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setAuthError(null);
      await signInWithGoogle();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('popup-closed-by-user') && !msg.includes('cancelled-popup-request')) {
        setAuthError('Authentication notice: ' + msg);
      }
    }
  };

  const handleLogOut = async () => {
    try {
      setAuthError(null);
      await logOut();
    } catch (err: unknown) {
      console.error('Sign-out error:', err);
    }
  };

  // Subscribe to real-time database when signed in as admin
  useEffect(() => {
    if (!isOpen || !isAdmin) {
      setOrders([]);
      setAppointments([]);
      return;
    }

    setErrorMsg(null);

    const unsubOrders = subscribeToOrders(
      (data) => setOrders(data),
      (err) => {
        console.error('Orders subscription error:', err);
        setErrorMsg('Unable to sync live orders: ' + err.message);
      }
    );

    const unsubAppts = subscribeToAppointments(
      (data) => setAppointments(data),
      (err) => {
        console.error('Appointments subscription error:', err);
      }
    );

    return () => {
      if (typeof unsubOrders === 'function') unsubOrders();
      if (typeof unsubAppts === 'function') unsubAppts();
    };
  }, [isOpen, isAdmin]);

  if (!isOpen) return null;

  const handleCopySchema = async () => {
    try {
      await navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA.trim());
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2500);
    } catch (err) {
      console.error('Failed to copy schema:', err);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdating(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleApptStatusChange = async (apptId: string, newStatus: AppointmentStatus) => {
    setIsUpdating(apptId);
    try {
      await updateAppointmentStatus(apptId, newStatus);
    } catch (err) {
      console.error('Failed to update appointment status:', err);
    } finally {
      setIsUpdating(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery) ||
      (o.deliveryLocation && o.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAppts = appointments.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone.includes(searchQuery) ||
      a.purpose.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'in_production':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'ready':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'cancelled':
        return 'bg-neutral-800 text-neutral-400 border-neutral-700';
      case 'scheduled':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-neutral-800 text-neutral-300 border-white/10';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0e1015] border border-white/15 rounded-2xl shadow-2xl p-5 sm:p-8 z-10 text-left my-8 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#c69c6d]/15 text-[#c69c6d] border border-[#c69c6d]/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                  NIBOCS Atelier Database
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Firestore Online</span>
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Cloud Firestore Real-Time Records & Production Pipeline
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-full bg-black/40 hover:bg-black text-neutral-300 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth / Access State Banner */}
        <div className="py-3 px-4 my-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-neutral-300">
            <Shield className="w-4 h-4 text-[#c69c6d]" />
            {user ? (
              <span>
                Signed in as <span className="font-mono text-white">{user.email}</span>
                {isAdmin ? (
                  <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    VERIFIED ATELIER ADMIN
                  </span>
                ) : (
                  <span className="ml-2 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                    Customer Access (Admin required to inspect order PII)
                  </span>
                )}
              </span>
            ) : (
              <span>
                Zero-Trust Security active. Sign in with administrator email (<span className="text-neutral-400 font-mono">{ADMIN_EMAIL}</span>) to view customer order records.
              </span>
            )}
          </div>

          <div>
            {user ? (
              <button
                type="button"
                onClick={handleLogOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#c69c6d] hover:bg-[#d8b082] text-neutral-950 font-semibold transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>

        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
            <span>{authError}</span>
            <button
              type="button"
              onClick={() => setAuthError(null)}
              className="text-amber-400 hover:text-white font-mono text-xs ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* If Not Admin */}
        {!isAdmin ? (
          <div className="py-12 px-6 text-center space-y-4 my-auto">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 text-[#c69c6d] flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h4 className="text-base font-semibold text-white">
                Customer PII Protected by Security Rules
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                In compliance with strict ABAC rules, customer phone numbers, addresses, and commission details are restricted to the workshop administrator (<span className="text-neutral-300 font-mono">{ADMIN_EMAIL}</span>).
              </p>
              <p className="text-xs text-neutral-500">
                Any customer can place orders through the showcase or Atelier Studio, which are instantly committed to Firestore.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSignIn}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c69c6d] hover:bg-[#d8b082] text-neutral-950 font-semibold text-xs transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign in as Atelier Administrator</span>
            </button>
          </div>
        ) : (
          /* Admin View */
          <div className="flex-1 flex flex-col min-h-0 space-y-4">
            {/* Tabs & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 p-1 rounded-xl bg-neutral-900 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'orders'
                      ? 'bg-[#c69c6d] text-neutral-950 font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Footwear Orders ({orders.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('appointments')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'appointments'
                      ? 'bg-[#c69c6d] text-neutral-950 font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Workshop Appointments ({appointments.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('backend')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'backend'
                      ? 'bg-[#c69c6d] text-neutral-950 font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Backend & Supabase</span>
                </button>
              </div>

              {/* Search & Filter */}
              <div className="flex items-center gap-2 flex-1 max-w-md justify-end">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, phone, model..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d]"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c69c6d]"
                >
                  <option value="all">All Statuses</option>
                  {activeTab === 'orders' ? (
                    <>
                      <option value="received">Received</option>
                      <option value="in_production">In Production</option>
                      <option value="ready">Ready</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </>
                  ) : (
                    <>
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 min-h-[300px]">
              {activeTab === 'orders' ? (
                filteredOrders.length === 0 ? (
                  <div className="py-16 text-center text-xs text-neutral-500 space-y-2">
                    <ShoppingBag className="w-8 h-8 text-neutral-600 mx-auto" />
                    <p>No footwear orders found matching criteria.</p>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 hover:border-white/15 transition-all text-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm">
                              {order.fullName}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono border capitalize ${getStatusBadge(
                                order.status
                              )}`}
                            >
                              {order.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-neutral-400 text-xs mt-0.5">
                            Model: <span className="text-[#c69c6d] font-medium">{order.productName}</span> · Size: {order.size}
                          </p>
                        </div>

                        {/* Status Switcher */}
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] text-neutral-400">Update:</label>
                          <select
                            disabled={isUpdating === order.id}
                            value={order.status}
                            onChange={(e) =>
                              order.id && handleStatusChange(order.id, e.target.value as OrderStatus)
                            }
                            className="px-2 py-1 rounded bg-neutral-950 border border-white/10 text-white text-[11px] focus:outline-none focus:border-[#c69c6d] cursor-pointer"
                          >
                            <option value="received">Received</option>
                            <option value="in_production">In Production</option>
                            <option value="ready">Ready</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Details row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[11px] text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#c69c6d]" />
                          <a href={`tel:${order.phone}`} className="text-white hover:underline font-mono">
                            {order.phone}
                          </a>
                        </div>
                        {order.deliveryLocation && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                            <span className="truncate">{order.deliveryLocation}</span>
                          </div>
                        )}
                        {order.leatherType && (
                          <div className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-neutral-500" />
                            <span className="truncate">{order.leatherType}</span>
                          </div>
                        )}
                      </div>

                      {order.customNotes && (
                        <p className="text-[11px] text-neutral-400 italic bg-black/20 p-2 rounded-lg border border-white/5">
                          "{order.customNotes}"
                        </p>
                      )}
                    </div>
                  ))
                )
              ) : activeTab === 'appointments' ? (
                filteredAppts.length === 0 ? (
                  <div className="py-16 text-center text-xs text-neutral-500 space-y-2">
                  <Calendar className="w-8 h-8 text-neutral-600 mx-auto" />
                  <p>No workshop appointments found matching criteria.</p>
                </div>
              ) : (
                filteredAppts.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 hover:border-white/15 transition-all text-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-sm">{appt.fullName}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono border capitalize ${getStatusBadge(
                              appt.status
                            )}`}
                          >
                            {appt.status}
                          </span>
                        </div>
                        <p className="text-neutral-400 text-xs mt-0.5">
                          Purpose: <span className="text-[#c69c6d]">{appt.purpose}</span>
                        </p>
                      </div>

                      {/* Status Switcher */}
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] text-neutral-400">Update:</label>
                        <select
                          disabled={isUpdating === appt.id}
                          value={appt.status}
                          onChange={(e) =>
                            appt.id &&
                            handleApptStatusChange(appt.id, e.target.value as AppointmentStatus)
                          }
                          className="px-2 py-1 rounded bg-neutral-950 border border-white/10 text-white text-[11px] focus:outline-none focus:border-[#c69c6d] cursor-pointer"
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[11px] text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#c69c6d]" />
                        <span className="text-white font-mono">{appt.date}</span>
                      </div>
                      {appt.timeSlot && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{appt.timeSlot}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-neutral-500" />
                        <a href={`tel:${appt.phone}`} className="text-white hover:underline font-mono">
                          {appt.phone}
                        </a>
                      </div>
                    </div>

                    {appt.notes && (
                      <p className="text-[11px] text-neutral-400 italic bg-black/20 p-2 rounded-lg border border-white/5">
                        "{appt.notes}"
                      </p>
                    )}
                  </div>
                ))
              ) ) : (
                /* Backend & Supabase Configuration Tab */
                <div className="space-y-4 py-2 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Status Card 1 */}
                    <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400 font-medium">REST API Server</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Active (Express)
                        </span>
                      </div>
                      <p className="text-white font-semibold text-sm">Full-Stack Server</p>
                      <p className="text-neutral-400 text-[11px]">
                        Endpoints serving /api/orders, /api/appointments, /api/health on port 3000.
                      </p>
                    </div>

                    {/* Status Card 2 */}
                    <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400 font-medium">Primary Database</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Provisioned
                        </span>
                      </div>
                      <p className="text-white font-semibold text-sm">Cloud Firestore</p>
                      <p className="text-neutral-400 text-[11px]">
                        Persistent database with ABAC security rules & real-time sync listeners.
                      </p>
                    </div>

                    {/* Status Card 3 */}
                    <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400 font-medium">Supabase Bridge</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                            isSupabaseConfigured
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          {isSupabaseConfigured ? 'Connected' : 'Adapter Ready'}
                        </span>
                      </div>
                      <p className="text-white font-semibold text-sm">Supabase PostgreSQL</p>
                      <p className="text-neutral-400 text-[11px]">
                        {isSupabaseConfigured
                          ? 'Synchronizing orders & bookings directly to your Supabase tables.'
                          : 'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env to mirror records.'}
                      </p>
                    </div>
                  </div>

                  {/* Supabase Schema Helper */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#c69c6d]" />
                        <span className="font-semibold text-white">
                          Supabase SQL Schema (Tables & Row Level Security)
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopySchema}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c69c6d] hover:bg-[#d8b082] text-neutral-950 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        {copiedSchema ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy SQL for Supabase</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-neutral-400 text-xs leading-relaxed">
                      To mirror your atelier data into Supabase, paste this SQL script into the <strong>SQL Editor</strong> of your Supabase dashboard (creates <code>public.orders</code> and <code>public.appointments</code> tables with RLS).
                    </p>

                    <pre className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] font-mono text-neutral-300 overflow-x-auto max-h-48">
                      {SUPABASE_SQL_SCHEMA.trim()}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
