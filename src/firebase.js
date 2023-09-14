import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCThgw8BO-y_o70ca3mpWataevzAL_FmFk",
  authDomain: "blogapp-cc169.firebaseapp.com",
  projectId: "blogapp-cc169",
  storageBucket: "blogapp-cc169.appspot.com",
  messagingSenderId: "697093797426",
  appId: "1:697093797426:web:24d491cf31c6c4c0b8ae2b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
