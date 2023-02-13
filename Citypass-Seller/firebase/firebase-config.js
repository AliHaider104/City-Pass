import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsemUUC3mZk-4hpHA09r0spNKlVDE2CS4",
  authDomain: "citypass-8e504.firebaseapp.com",
  projectId: "citypass-8e504",
  storageBucket: "citypass-8e504.appspot.com",
  messagingSenderId: "559398695074",
  appId: "1:559398695074:web:8187a0acf3e0c02a1da7fb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, db };
