import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getPerformance } from "firebase/performance";

// wefit config
const firebaseConfig = {
  apiKey: "AIzaSyB7bwwpilOaMu7PQermajiVyAnK7PLazQM",
  authDomain: "wefit-5f13a.firebaseapp.com",
  projectId: "wefit-5f13a",
  storageBucket: "wefit-5f13a.appspot.com",
  messagingSenderId: "459666886804",
  appId: "1:459666886804:web:43ba64f4787f618b3da481",
  measurementId: "G-P4J02ZLTY3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const perf = getPerformance(app);

export { app, auth, db, storage };