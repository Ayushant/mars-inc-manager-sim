
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'admin' | 'super_admin') => Promise<boolean>;
  register: (email: string, password: string, fullName: string, collegeName: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Email service simulation
const sendWelcomeEmail = async (email: string, role: string) => {
  console.log(`Sending welcome email to ${email} for role: ${role}`);
  // In a real app, this would integrate with an email service
  return new Promise(resolve => setTimeout(resolve, 1000));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('mars_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'admin' | 'super_admin'): Promise<boolean> => {
    try {
      // Special handling for super admin credentials
      if (email === 'kayushant@gmail.com' && password === '1234567') {
        // Send email notification
        await sendWelcomeEmail(email, 'super_admin');
        
        const superAdminUser: User = {
          id: 'super_admin_001',
          email,
          role: 'super_admin',
          full_name: 'Super Administrator',
          college_name: undefined
        };
        
        setUser(superAdminUser);
        localStorage.setItem('mars_user', JSON.stringify(superAdminUser));
        return true;
      }

      // Simulate API call - in real app, this would be Supabase auth
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        full_name: role === 'admin' ? 'Admin User' : role === 'super_admin' ? 'Super Admin' : 'Student User',
        college_name: role === 'student' ? 'Demo College' : undefined
      };
      
      setUser(mockUser);
      localStorage.setItem('mars_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, fullName: string, collegeName: string): Promise<boolean> => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role: 'student',
        full_name: fullName,
        college_name: collegeName
      };
      
      setUser(mockUser);
      localStorage.setItem('mars_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mars_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
