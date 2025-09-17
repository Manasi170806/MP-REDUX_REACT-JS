import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBfeDVza1YUHXSglO7e50gQIIY_oMu8W6M",
  authDomain: "whatsapp-clone-5f46e.firebaseapp.com",
  projectId: "whatsapp-clone-5f46e",
  storageBucket: "whatsapp-clone-5f46e.firebasestorage.app",
  messagingSenderId: "848411468555",
  appId: "1:848411468555:web:08e8299c463d98ee15b80e",
  measurementId: "G-433H5CQQHH"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);