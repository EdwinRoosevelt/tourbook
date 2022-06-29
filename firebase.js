import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "tourbook-54a0f",
  storageBucket: "tourbook-54a0f.appspot.com",
  messagingSenderId: "557925440304",
  appId: process.env.FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };