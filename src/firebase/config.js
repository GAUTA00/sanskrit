import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getStorage } from "firebase/storage"; // Import getStorage from Firebase
import { getFirestore } from "firebase/firestore"; // Import Firestore for database

const firebaseConfig = {
  apiKey: "AIzaSyB0bGyVdkBN7VfPA6Wo6vgcoOSlbljOKA0",
  authDomain: "sanskrit-51a06.firebaseapp.com",
  projectId: "sanskrit-51a06",
  storageBucket: "sanskrit-51a06.appspot.com", // Ensure the storageBucket is defined
  messagingSenderId: "19630717880",
  appId: "1:19630717880:web:7ec6cc50a3b71e2c2eed4d",
  databaseURL: "https://sanskrit-51a06-default-rtdb.firebaseio.com", // Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getDatabase(app); // Initialize Firebase Realtime Database
const firestore = getFirestore(app); // Initialize Firestore (Firestore specifically for document-based data storage)
const storage = getStorage(app); // Initialize Firebase Storage

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

// Add contact data to Firebase Database (using Realtime Database)
const addContactDataToDatabase = async (formData) => {
  try {
    const emailKey = formData.email.replace(/[^a-zA-Z0-9]/g, "_");
    const contactRef = ref(db, `contacts/${emailKey}`);

    await set(contactRef, {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date().toISOString(),
    });

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export {
  app,
  auth,
  db,
  firestore, // Export Firestore instance
  storage, // Export the storage service
  loginAdmin,
  logoutAdmin,
  addContactDataToDatabase,
};
