import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Shlok from "./components/Shlok";
import ShlokDetail from "./components/ShlokDetail";
import Mantra from "./components/Mantra";
import Katha from "./components/Katha";
import Geet from "./components/Geet";
// import Hasyakanika from "./components/Hasyakanika";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ContactUs from "./components/contactUs";
import { setupAuthListener } from "./firebase/authListener"; // Firebase Auth listener
import { auth } from "./firebase/config"; // Firebase Auth service
import GeetDetail from "./components/GeetDetail";
import MantraDetail from "./components/MantraDetail";
import KathaDetail from "./components/KathaDetail";
// import HasyakanikaDetail from "./components/HasyakanikaDetail";
import SentencesAndWords from "./components/SentencesAndWords";
import WordSentenceDetail from "./components/SentenceAndWordsDetails";
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Listen for changes in authentication state (session persistence across reload)
  useEffect(() => {
    setupAuthListener(setCurrentUser);
  }, []);

  // Protect the routes that require the user to be logged in (e.g., the admin dashboard)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      // If the user is not logged in, redirect to the login page
      return <Navigate to="/admin" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shlok" element={<Shlok />} />
        <Route path="/shlok/:id" element={<ShlokDetail />} />
        <Route path="/mantra" element={<Mantra />} />
        <Route path="/mantra/:id" element={<MantraDetail />} />
        <Route path="/katha" element={<Katha />} />
        <Route path="/katha/:id" element={<KathaDetail />} />
        <Route path="/geet" element={<Geet />} />
        <Route path="/geet/:id" element={<GeetDetail />} /> {/* Ensure this exists */}
        {/* <Route path="/hasyakanika" element={<Hasyakanika />} /> */}
        {/* <Route path="/hasyakanika/:id" element={<HasyakanikaDetail />} /> */}

        <Route path="/sentenceandwords" element={<SentencesAndWords />} />
        <Route path="/sentenceandwords/:id" element={<WordSentenceDetail />} />


        {/* Updated Admin Login Route */}

        <Route path="/admin" element={<AdminLogin />} />

        {/* Updated Protected Admin Dashboard Route */}
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default App;
