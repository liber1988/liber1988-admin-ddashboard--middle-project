import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBI55aGsPh4YaRLP_J1YsUlIMHA_4uT6Y4",
  authDomain: "trading-dashboard-100eb.firebaseapp.com",
  projectId: "trading-dashboard-100eb",
  storageBucket: "trading-dashboard-100eb.appspot.com",
  messagingSenderId: "1046675304964",
  appId: "1:1046675304964:web:7ae76c7268b16ce6ddbb51",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export default app;
