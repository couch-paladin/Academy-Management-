import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjgccsOgSsibd5Z3qxKa3api-tqDXwZY0",
  authDomain: "eduvance-academy.firebaseapp.com",
  projectId: "eduvance-academy",
  storageBucket: "eduvance-academy.firebasestorage.app",
  messagingSenderId: "1010713775139",
  appId: "1:1010713775139:web:7a6cffa2bc6ae4cc3e3596"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
