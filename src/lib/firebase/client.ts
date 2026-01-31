import { firebaseConfig, isFirebaseConfigReady } from "@/lib/firebase/config";

type FirebaseApp = unknown;
type Firestore = unknown;

let firebaseApp: FirebaseApp | null = null;
let firebaseDb: Firestore | null = null;

function dynamicImport(modulePath: string) {
  const importer = new Function(
    "modulePath",
    "return import(modulePath)"
  ) as (path: string) => Promise<unknown>;
  return importer(modulePath);
}

async function loadFirebaseAppModule() {
  return dynamicImport("firebase/app") as Promise<{
    initializeApp: (config: typeof firebaseConfig) => FirebaseApp;
    getApp: () => FirebaseApp;
    getApps: () => FirebaseApp[];
  }>;
}

async function loadFirestoreModule() {
  return dynamicImport("firebase/firestore") as Promise<{
    getFirestore: (app: FirebaseApp) => Firestore;
  }>;
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

export async function getFirebaseDb(): Promise<Firestore> {
  if (firebaseDb) {
    return firebaseDb;
  }
  const { getFirestore } = await loadFirestoreModule();
  firebaseDb = getFirestore(await getFirebaseApp());
  return firebaseDb;
}
