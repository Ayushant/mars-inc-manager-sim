
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, LogIn, UserPlus, Shield } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    collegeName: '',
    role: 'student' as 'student' | 'admin' | 'super_admin'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password, formData.role);
      } else {
        success = await register(formData.email, formData.password, formData.fullName, formData.collegeName);
      }

      if (success) {
        const route = formData.role === 'super_admin' ? '/super-admin' : 
                      formData.role === 'admin' ? '/admin' : '/student';
        navigate(route);
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mars Inc.</h1>
          <p className="text-gray-600">Area Manager Simulation</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Role Selection for Login */}
          {isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Login as
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'student'})}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.role === 'student'
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Users className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-xs font-medium">Student</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'admin'})}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.role === 'admin'
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-xs font-medium">Admin</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'super_admin'})}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.role === 'super_admin'
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Shield className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-xs font-medium">Super</div>
                </button>
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="your.email@college.edu"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {/* Registration Fields */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.collegeName}
                  onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your college/university"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </>
            )}
          </button>

          {/* Toggle Mode */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
