// Enhanced AdminDashboard.jsx
import { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ImageManager from "./ImageManager";
import ContentManager from "./ContentManager";
import ContentList from "./ContentList"; // New component for listing/editing/deleting

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Check if admin in Firestore
        setUser(currentUser);
      } else {
        navigate('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#2F5D71] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-khand font-bold">Sanskrit Admin</h1>
          <div className="flex space-x-4">
            <Link to="/admin/dashboard/content-list" className="hover:text-[#E3DBC2] transition-colors">
              Manage Content
            </Link>
            <Link to="/admin/dashboard/add-content" className="hover:text-[#E3DBC2] transition-colors">
              Add Content
            </Link>
            <Link to="/admin/dashboard/upload" className="hover:text-[#E3DBC2] transition-colors">
              Upload Images
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <Routes>
          <Route path="content-list" element={<ContentList />} />
          <Route path="add-content" element={<ContentManager />} />
          <Route path="upload" element={<ImageManager />} />
        </Routes>
      </div>
    </div>
  );
};
export default AdminDashboard;