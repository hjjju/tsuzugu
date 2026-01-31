import { firebaseConfig, isFirebaseConfigReady } from "@/lib/firebase/config";

let firebaseApp: unknown | null = null;
let firebaseDb: unknown | null = null;

async function loadFirebaseAppModule() {
  return import(/* webpackIgnore: true */ "firebase/app");
}

async function loadFirestoreModule() {
  return import(/* webpackIgnore: true */ "firebase/firestore");
}

async function getFirebaseApp() {
  if (firebaseApp) {
    return firebaseApp;
  }
  if (!isFirebaseConfigReady) {
    throw new Error(
      "Firebase config is missing. Check NEXT_PUBLIC_FIREBASE_* env vars."
    );
  }
  const { initializeApp, getApp, getApps } = await loadFirebaseAppModule();
  firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return firebaseApp;
}

export async function getFirebaseDb() {
  if (firebaseDb) {
    return firebaseDb;
  }
  const { getFirestore } = await loadFirestoreModule();
  firebaseDb = getFirestore(await getFirebaseApp());
  return firebaseDb;
}
