// Import necessary Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk_A4Nz5Bz9fsFpd2rX56b1Fv4GlY7wCM",
  authDomain: "auto-key-genrate.firebaseapp.com",
  databaseURL: "https://auto-key-genrate-default-rtdb.firebaseio.com", // Ensure this URL is correct
  projectId: "auto-key-genrate",
  storageBucket: "auto-key-genrate.appspot.com",
  messagingSenderId: "656423303107",
  appId: "1:656423303107:web:ee39c20bc6d54b9bcaef76",
  measurementId: "G-PE3YE8PPL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Automatically sign in the user anonymously
signInAnonymously(auth)
  .then(() => {
    console.log('User signed in anonymously');
  })
  .catch((error) => {
    console.error('Error during anonymous sign-in:', error);
  });

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user.uid);
  } else {
    console.log('No user is signed in');
  }
});

// Export the Firebase components for use in other scripts
export { auth, db };
