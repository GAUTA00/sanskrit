import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBook, FaOm, FaMusic, FaLanguage, FaHome, FaSignOutAlt, FaBars, FaTimes, FaLayerGroup, FaQuoteRight } from 'react-icons/fa';
import { logoutAdmin } from '../../firebase/config';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAdmin();
        navigate('/admin');
    };

    const navItems = [
        { path: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> },
        { path: "/admin/dashboard/shlok", label: "Manage Shlokas", icon: <FaBook /> },
        { path: "/admin/dashboard/mantra", label: "Manage Mantras", icon: <FaOm /> },
        { path: "/admin/dashboard/katha", label: "Manage Kathas", icon: <FaLayerGroup /> },
        { path: "/admin/dashboard/geet", label: "Manage Geets", icon: <FaMusic /> },
        { path: "/admin/dashboard/phrases", label: "Daily Phrases", icon: <FaQuoteRight /> },
        { path: "/admin/dashboard/sentences", label: "Sentences & Words", icon: <FaLanguage /> },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar Container */}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-xl`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-2xl font-khand font-bold text-center">Admin Panel</h2>
                        <p className="text-center text-accent/70 text-sm">Sanskrit Mission</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin/dashboard"} // Only exact match for dashboard
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-mukta ${isActive ? 'bg-secondary text-white shadow-md' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer / Logout */}
                    <div className="p-4 border-t border-white/10">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200"
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                ></div>
            )}
        </>
    );
};

export default Sidebar;
