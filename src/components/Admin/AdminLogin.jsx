// src/components/Admin/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import { loginAdmin } from '../../firebase/config';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user, error: loginError } = await loginAdmin(email, password);
      if (loginError) {
        setError('Invalid email or password');
      } else if (user) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F7F7] to-[#E3DBC2]/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-[#F18056]/10 mb-4">
            <FaUser className="w-8 h-8 text-[#F18056]" />
          </div>
          <h2 className="text-3xl font-bold text-[#2F5D71] font-khand">Admin Access</h2>
          <p className="text-[#2F5D71]/70 mt-2 font-khand">Enter your credentials to continue</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md"
          >
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          </motion.div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-[#2F5D71] text-sm font-medium mb-2 font-khand">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-200 focus:border-[#F18056] transition-colors bg-white/80 rounded-t-md focus:outline-none font-khand"
                placeholder="admin@sanskrit.org"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-[#2F5D71] text-sm font-medium mb-2 font-khand">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-200 focus:border-[#F18056] transition-colors bg-white/80 rounded-t-md focus:outline-none font-khand"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all transform
              ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#F18056] hover:bg-[#F18056]/90 hover:shadow-lg'
              } font-khand text-lg`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </div>
            ) : 'Sign In'}
          </motion.button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm text-[#2F5D71]/70">
            Protected area. Authorized personnel only.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;