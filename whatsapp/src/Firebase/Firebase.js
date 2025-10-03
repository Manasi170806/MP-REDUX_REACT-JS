import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfeDVza1YUHXSglO7e50gQIIY_oMu8W6M",
  authDomain: "whatsapp-clone-5f46e.firebaseapp.com",
  projectId: "whatsapp-clone-5f46e",
  storageBucket: "whatsapp-clone-5f46e.firebasestorage.app",
  messagingSenderId: "848411468555",
  appId: "1:848411468555:web:08e8299c463d98ee15b80e",
  measurementId: "G-433H5CQQHH"
};

// Initialize Firebase
console.log('Initializing Firebase with project:', firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Test authentication connection
console.log('Firebase Auth initialized:', auth.app.name);
console.log('Firestore initialized:', db.app.name);

export default app;