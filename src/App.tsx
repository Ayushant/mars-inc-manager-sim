
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { SimulationGame } from './components/SimulationGame';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/student" element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/super-admin" element={
              <ProtectedRoute role="super_admin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/simulation/:sessionId" element={
              <ProtectedRoute role="student">
                <SimulationGame />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
