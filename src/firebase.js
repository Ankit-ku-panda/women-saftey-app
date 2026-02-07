import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD23yjFc7DHsLYHrcElMLVhBsYMoSbukMA",
  authDomain: "women-saftey-ad2fb.firebaseapp.com",
  projectId: "women-saftey-ad2fb",
  storageBucket: "women-saftey-ad2fb.firebasestorage.app",
  messagingSenderId: "768618870010",
  appId: "1:768618870010:web:f180f006a177bd35eb0543"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// keeps user logged in permanently
setPersistence(auth, browserLocalPersistence);

// auto login (user never sees login page)
signInAnonymously(auth);
