import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigReady } from "@/lib/firebase/config";

let firebaseApp: FirebaseApp | null = null;

function getFirebaseApp() {
  if (firebaseApp) {
    return firebaseApp;
  }
  if (getApps().length > 0) {
    firebaseApp = getApp();
    return firebaseApp;
  }
  if (!isFirebaseConfigReady) {
    throw new Error("Firebase config is missing. Check NEXT_PUBLIC_FIREBASE_* env vars.");
  }
  firebaseApp = initializeApp(firebaseConfig);
  return firebaseApp;
}

export const firebaseDb = getFirestore(getFirebaseApp());
