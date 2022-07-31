// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhb9Hs5girQTLxFJV-1znoZnx09rgsxqc",
  authDomain: "sosorry-blog.firebaseapp.com",
  projectId: "sosorry-blog",
  storageBucket: "sosorry-blog.appspot.com",
  messagingSenderId: "1085075158669",
  appId: "1:1085075158669:web:adf622539e2d0833ab54c4",
  measurementId: "G-C26Q74X74J",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
