import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCV3XEbK4oor4aWlZug0eTgYJsj9sw8-wQ",
    authDomain: "sensorapp-cdcba.firebaseapp.com",
    projectId: "sensorapp-cdcba",
    storageBucket: "sensorapp-cdcba.appspot.com",
    messagingSenderId: "989381426776",
    appId: "1:989381426776:web:10d420f9027d3a52da142d",
    measurementId: "G-K4679W47TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
