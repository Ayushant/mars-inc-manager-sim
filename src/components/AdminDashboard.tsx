
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Activity, CheckCircle, TrendingUp, LogOut, Download, Plus } from 'lucide-react';
import { AdminAnalytics, SimulationSession } from '../types';
import { AddStudentDialog } from './AddStudentDialog';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [analytics, setAnalytics] = useState<AdminAnalytics>({
    totalStudents: 0,
    activeSessions: 0,
    completedSessions: 0,
    averageScore: 0
  });
  const [recentSessions, setRecentSessions] = useState<SimulationSession[]>([]);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    // Simulate analytics data
    const mockAnalytics: AdminAnalytics = {
      totalStudents: 156,
      activeSessions: 23,
      completedSessions: 89,
      averageScore: 76.5
    };
    setAnalytics(mockAnalytics);

    // Mock recent sessions data
    const mockSessions: SimulationSession[] = [
      {
        id: '1',
        user_id: 'user1',
        session_name: 'Mars Inc. Simulation',
        start_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        current_decision: 3,
        is_completed: true,
        total_score: 85,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        user_id: 'user2',
        session_name: 'Mars Inc. Simulation',
        start_time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        current_decision: 2,
        is_completed: false,
        total_score: 35,
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        user_id: 'user3',
        session_name: 'Mars Inc. Simulation',
        start_time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        current_decision: 3,
        is_completed: true,
        total_score: 92,
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      }
    ];
    setRecentSessions(mockSessions);
  };

  const exportData = () => {
    // Simulate data export
    const csvData = recentSessions.map(session => ({
      'Session ID': session.id,
      'Student': `Student ${session.user_id}`,
      'College': 'Demo College',
      'Status': session.is_completed ? 'Completed' : 'In Progress',
      'Score': session.total_score,
      'Started': new Date(session.start_time).toLocaleString(),
      'Completed': session.end_time ? new Date(session.end_time).toLocaleString() : 'N/A'
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'simulation-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Mars Inc. Simulation Analytics</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Student
              </button>
              <button
                onClick={exportData}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <div className="text-right">
                <p className="text-sm text-gray-600">Logged in as</p>
                <p className="font-semibold text-gray-900">{user?.full_name || 'Admin'}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalStudents}</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.activeSessions}</p>
                <p className="text-xs text-orange-600 mt-1">↑ 8% from yesterday</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.completedSessions}</p>
                <p className="text-xs text-purple-600 mt-1">↑ 15% this week</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Score</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.averageScore.toFixed(1)}</p>
                <p className="text-xs text-green-600 mt-1">↑ 3.2 points</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sessions Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Sessions</h2>
            <div className="text-sm text-gray-600">
              Showing {recentSessions.length} recent sessions
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700">Student</th>
                  <th className="text-left p-4 font-semibold text-gray-700">College</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Score</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Progress</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Started</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((session, index) => (
                  <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-semibold text-sm">
                            {`S${index + 1}`}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">Student {session.user_id}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">Demo College</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.is_completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {session.is_completed ? 'Completed' : 'In Progress'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-gray-900">{session.total_score}</span>
                      <span className="text-gray-500 text-sm"> / 65</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full"
                            style={{ width: `${(session.current_decision / 3) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {session.current_decision}/3
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(session.start_time).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Student Dialog */}
        <AddStudentDialog 
          open={isAddStudentOpen} 
          onOpenChange={setIsAddStudentOpen} 
        />
      </div>
    </div>
  );
};
