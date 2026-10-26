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
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  uploadString, 
  getDownloadURL 
} from 'firebase/storage';

const FIREBASE_CONFIG_KEY = 'badri_firebase_config_v1';

// Default config can read from Vite environment variables or localStorage
export const getFirebaseConfig = () => {
  try {
    const saved = localStorage.getItem(FIREBASE_CONFIG_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Error reading Firebase config from localStorage:', e);
  }

  // Fallback to Vite environment variables if defined
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
    };
  }

  return null;
};

export const saveFirebaseConfig = (config) => {
  if (config) {
    localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
  } else {
    localStorage.removeItem(FIREBASE_CONFIG_KEY);
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

// Get Firebase Storage instance
export const getFirebaseStorage = () => {
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    return getStorage(app);
  } catch (err) {
    console.error('Failed to get Firebase Storage:', err);
    return null;
  }
};

/**
 * Uploads an image (File, Blob, DataURL, or remote HTTP URL) to Firebase Storage
 * and returns the public download URL.
 */
export const uploadImageToFirebase = async (storagePath, fileOrUrl) => {
  const storage = getFirebaseStorage();
  if (!storage) {
    throw new Error('Firebase Storage is not initialized. Please configure Firebase first.');
  }

  const storageRef = ref(storage, storagePath);

  if (typeof fileOrUrl === 'string') {
    if (fileOrUrl.startsWith('data:image/')) {
      // Data URL
      await uploadString(storageRef, fileOrUrl, 'data_url');
    } else if (fileOrUrl.startsWith('http://') || fileOrUrl.startsWith('https://')) {
      // External image URL -> fetch as Blob and upload
      const response = await fetch(fileOrUrl);
      if (!response.ok) throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
    } else {
      throw new Error('Unsupported image URL string format.');
    }
  } else if (fileOrUrl instanceof File || fileOrUrl instanceof Blob) {
    await uploadBytes(storageRef, fileOrUrl);
  } else {
    throw new Error('Invalid file or image input provided.');
  }

  // Get and return the permanent public download URL
  return await getDownloadURL(storageRef);
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
