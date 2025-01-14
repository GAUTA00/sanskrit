// src/firebase/authListener.js
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config'; // Import the Firebase auth instance

// A function to listen for changes in authentication state
export const setupAuthListener = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // If the user is signed in, store the user in state (admin details)
      setCurrentUser(user);
    } else {
      // If the user is signed out, clear the user from state
      setCurrentUser(null);
    }
  });
};
