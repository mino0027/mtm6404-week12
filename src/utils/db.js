import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB6vbUT6JSXnY31Nw-D5e4bpCTMoLjO5rE",
  authDomain: "mtm6404-claist.firebaseapp.com",
  projectId: "mtm6404-claist",
  storageBucket: "mtm6404-claist.firebasestorage.app",
  messagingSenderId: "346233734383",
  appId: "1:346233734383:web:380acd8f44878a7cfe471a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;