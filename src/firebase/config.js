import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6I28d1-thaMf9BeUbm5F5HhBhTiXesxQ",
  authDomain: "cooking-ninja-site-ddd1c.firebaseapp.com",
  projectId: "cooking-ninja-site-ddd1c",
  storageBucket: "cooking-ninja-site-ddd1c.appspot.com",
  messagingSenderId: "807358417744",
  appId: "1:807358417744:web:4ec7a724241a5d4c6efa55",
};
// Init firebase (which connects our frontend app to the backend)
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

export { db };
