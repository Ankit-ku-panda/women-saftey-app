import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 
  authDomain: 
  projectId: 
  storageBucket: 
  messagingSenderId: 
  appId: 
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// keeps user logged in permanently
setPersistence(auth, browserLocalPersistence);

// auto login (user never sees login page)
signInAnonymously(auth);
