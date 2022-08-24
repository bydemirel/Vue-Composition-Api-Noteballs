import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt4yfjD2DS18u3BK9M4lswQ4h8hJQk9zk",
  authDomain: "noteballs-63484.firebaseapp.com",
  projectId: "noteballs-63484",
  storageBucket: "noteballs-63484.appspot.com",
  messagingSenderId: "49728987062",
  appId: "1:49728987062:web:350338491ee9cf0bda6b17"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db}