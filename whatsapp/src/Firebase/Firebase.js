// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


// const firebaseConfig = {
//   apiKey: "AIzaSyBfeDVza1YUHXSglO7e50gQIIY_oMu8W6M",
//   authDomain: "whatsapp-clone-5f46e.firebaseapp.com",
//   projectId: "whatsapp-clone-5f46e",
//   storageBucket: "whatsapp-clone-5f46e.firebasestorage.app",
//   messagingSenderId: "848411468555",
//   appId: "1:848411468555:web:08e8299c463d98ee15b80e",
//   measurementId: "G-433H5CQQHH"
// };


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATxXsAn6QpW7TRc9LL0yk_KhUS1AjugIs",
  authDomain: "react-book-10am.firebaseapp.com",
  projectId: "react-book-10am",
  storageBucket: "react-book-10am.firebasestorage.app",
  messagingSenderId: "219388670787",
  appId: "1:219388670787:web:611169af1a86e86c2b35f6",
  measurementId: "G-JT2993KDXN",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const store = getFirestore(app);