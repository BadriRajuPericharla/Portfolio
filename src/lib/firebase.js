// Firebase Integration for Badri Raju Portfolio
// Provides real-time synchronization for projects, profile, text content, and cloud image storage.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot 
} from 'firebase/firestore';

const FIREBASE_CONFIG_KEY = 'badri_firebase_config_v1';

export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyB_Dh5v0jmNA5Z3doBqhfXt4TS8QzI4QJ4",
  authDomain: "portfolio-24460.firebaseapp.com",
  projectId: "portfolio-24460",
  storageBucket: "portfolio-24460.firebasestorage.app",
  messagingSenderId: "894922460628",
  appId: "1:894922460628:web:cbc95defe78cb6dacd1a41"
};

// Default config can read from localStorage, env variables, or default credentials
export const getFirebaseConfig = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = window.localStorage.getItem(FIREBASE_CONFIG_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading Firebase config from localStorage:', e);
    }
  }

  // Fallback to Vite environment variables if defined
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
    };
  }

  return DEFAULT_FIREBASE_CONFIG;
};

export const saveFirebaseConfig = (config) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    if (config) {
      window.localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
    } else {
      window.localStorage.removeItem(FIREBASE_CONFIG_KEY);
    }
  }
};

export const isFirebaseConfigured = () => {
  const cfg = getFirebaseConfig();
  return Boolean(cfg && cfg.apiKey && cfg.projectId);
};

// Initialize Firebase App singleton
export const getFirebaseApp = () => {
  const config = getFirebaseConfig();
  if (!config || !config.apiKey || !config.projectId) {
    return null;
  }

  if (getApps().length > 0) {
    return getApp();
  }

  try {
    return initializeApp(config);
  } catch (err) {
    console.error('Failed to initialize Firebase App:', err);
    return null;
  }
};

// Get Firestore instance
export const getFirestoreDb = () => {
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    return getFirestore(app);
  } catch (err) {
    console.error('Failed to get Firestore DB:', err);
    return null;
  }
};


/**
 * Saves a document to Firestore under a specified collection and document ID.
 */
export const saveDocToFirestore = async (collectionName, docId, data) => {
  const db = getFirestoreDb();
  if (!db) {
    throw new Error('Firestore is not initialized. Please configure Firebase first.');
  }
  const docRef = doc(db, collectionName, docId);
  await setDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  }, { merge: true });
  return true;
};

/**
 * Fetches a document from Firestore.
 */
export const fetchDocFromFirestore = async (collectionName, docId) => {
  const db = getFirestoreDb();
  if (!db) return null;
  const docRef = doc(db, collectionName, docId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data();
  }
  return null;
};

/**
 * Subscribes to real-time updates for a single Firestore document.
 */
export const subscribeToFirestoreDoc = (collectionName, docId, callback) => {
  const db = getFirestoreDb();
  if (!db) return () => {};
  const docRef = doc(db, collectionName, docId);
  return onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    }
  }, (err) => {
    console.warn(`Firestore subscription error on ${collectionName}/${docId}:`, err);
  });
};
