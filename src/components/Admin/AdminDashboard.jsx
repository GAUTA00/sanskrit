import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../firebase/config";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await logoutAdmin();
    if (!error) {
      navigate("/"); // Redirect to Home page
    } else {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
      {/* Content Management UI */}
      <div>
        <p>Manage content here...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
