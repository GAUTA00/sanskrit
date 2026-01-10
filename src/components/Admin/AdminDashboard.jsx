// Enhanced AdminDashboard.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from "./Sidebar";
import ManageShlok from "./ManageShlok";
import ManageMantra from "./ManageMantra";
import ManageKatha from "./ManageKatha";
import ManageGeet from "./ManageGeet";
import ManageSentences from "./ManageSentences";
import ManagePhrases from "./ManagePhrases";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div className="flex h-screen items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 transition-all duration-300">
        <div className="p-6 md:p-10">
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-4xl font-khand font-bold text-primary mb-4">Welcome to Admin Dashboard</h1>
                <p className="text-xl text-gray-600 font-khand">Select a category from the sidebar to manage content.</p>
              </div>
            } />
            <Route path="shlok" element={<ManageShlok />} />
            <Route path="mantra" element={<ManageMantra />} />
            <Route path="katha" element={<ManageKatha />} />
            <Route path="geet" element={<ManageGeet />} />
            <Route path="sentences" element={<ManageSentences />} />
            <Route path="phrases" element={<ManagePhrases />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;