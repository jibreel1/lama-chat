import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyBxs9P9DXIDj1ejAb3h_hACtVly5gTyRmo",
   authDomain: "chat-app-3ba65.firebaseapp.com",
   projectId: "chat-app-3ba65",
   storageBucket: "chat-app-3ba65.appspot.com",
   messagingSenderId: "367226052250",
   appId: "1:367226052250:web:f0b581887643622a694923",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
