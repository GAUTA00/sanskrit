// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database'; // Import necessary functions from Firebase

const firebaseConfig = {
  apiKey: "AIzaSyB0bGyVdkBN7VfPA6Wo6vgcoOSlbljOKA0",
  authDomain: "sanskrit-51a06.firebaseapp.com",
  projectId: "sanskrit-51a06",
  storageBucket: "sanskrit-51a06.firebasestorage.app",
  messagingSenderId: "19630717880",
  appId: "1:19630717880:web:7ec6cc50a3b71e2c2eed4d",
  databaseURL: "https://sanskrit-51a06-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getDatabase(app); // Renamed from `database` to `db`

// Authentication functions
const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Add contact data to Firebase Database (sanitize email for valid path)
const addContactDataToDatabase = async (formData) => {
  try {
    // Replace invalid characters from the email to create a valid Firebase path
    const emailKey = formData.email.replace(/[^a-zA-Z0-9]/g, "_"); // Replace non-alphanumeric characters with "_"

    const contactRef = ref(db, `contacts/${emailKey}`); // Use the sanitized email as the key

    // Store the contact data in the Realtime Database under the 'contacts' node
    await set(contactRef, {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date().toISOString()
    });

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export {
  app,
  auth,
  db, // Export `db` instead of `database`
  loginAdmin,
  logoutAdmin,
  addContactDataToDatabase
};
