import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

/* CRITICAL: Specify firestoreDatabaseId and proxy-compatible network settings */
export const db = initializeFirestore(
  app,
  {
    experimentalForceLongPolling: true,
  },
  firebaseConfig.firestoreDatabaseId
);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const CONTACT_EMAIL = 'eamos7738@gmail.com';
export const ADMIN_EMAIL = CONTACT_EMAIL;
export const ADMIN_EMAILS = [CONTACT_EMAIL, 'davidthedums@gmail.com'];
