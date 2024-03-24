
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv_hu0ymk-8EKT2ECyvY_R9-GaMm--ABU",
  authDomain: "kicksboard-f0eda.firebaseapp.com",
  projectId: "kicksboard-f0eda",
  storageBucket: "kicksboard-f0eda.appspot.com",
  messagingSenderId: "419321903768",
  appId: "1:419321903768:web:bcda1166b3d88884216eed",
  measurementId: "G-MFZB54YKRL"
};

// Initialize Firebase

const fireBaseApp = getApps().length? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(); 

// Export firestore database
// It will be imported into your react app whenever it is needed
const db = getFirestore(fireBaseApp);

export { auth, fireBaseApp, db}