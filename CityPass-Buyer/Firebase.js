import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBk62VVGG3dTRFmEVOSeNUmTOYnf2s_RNc",
//   authDomain: "citypass-86ead.firebaseapp.com",
//   projectId: "citypass-86ead",
//   storageBucket: "citypass-86ead.appspot.com",
//   messagingSenderId: "665211522518",
//   appId: "1:665211522518:web:c342c47a4881aab6a02877"
// };

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
const auth = getAuth();

export { db, auth };
