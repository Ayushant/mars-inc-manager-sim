
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      navigate(user.role === 'admin' ? '/admin' : '/student');
    } else {
      // Show login screen by rendering the main app
      navigate('/');
    }
  }, [user, navigate]);

  return null; // This component just handles routing
};

export default Index;
