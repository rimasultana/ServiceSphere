// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMGToPxxHB_zg68hZtlaSD4eNlhSDrGog",
  authDomain: "service-sphere-d85f8.firebaseapp.com",
  projectId: "service-sphere-d85f8",
  storageBucket: "service-sphere-d85f8.firebasestorage.app",
  messagingSenderId: "289047355251",
  appId: "1:289047355251:web:d14a6aa779d72f7fbc2f06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
