import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBraXE2xQilg-0g2OW_gPYbb_Fa4qu8iOs",
  authDomain: "miredsocial-cfeb5.firebaseapp.com",
  projectId: "miredsocial-cfeb5",
  storageBucket: "miredsocial-cfeb5.firebasestorage.app",
  messagingSenderId: "1048536321824",
  appId: "1:1048536321824:web:aa4a74f2e0159d5c265145",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);
