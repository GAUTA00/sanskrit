import { Link, Routes, Route } from "react-router-dom";
import ImageManager from "./ImageManager";
import ContentManager from "./ContentManager";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <nav className="flex space-x-4 p-4 bg-gray-100">
        <Link to="/admin/dashboard/images" className="font-bold text-blue-600">Image Manager</Link>
        <Link to="/admin/dashboard/content" className="font-bold text-blue-600">Content Manager</Link>
      </nav>
      <Routes>
        <Route path="images" element={<ImageManager />} />
        <Route path="content" element={<ContentManager />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
