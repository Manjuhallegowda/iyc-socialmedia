import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { apiLogin } from '../services/api';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiLogin(username, password);
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-indiaGreen p-4 rounded-full">
            <Lock className="text-white w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-indiaGreen mb-2">Admin Portal</h2>
        <p className="text-center text-gray-500 mb-8">Karnataka Social Media</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
            <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron outline-none pl-10"
                  placeholder="Enter username"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron outline-none pl-10"
                  placeholder="Enter password"
                />
                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-indiaGreen text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;