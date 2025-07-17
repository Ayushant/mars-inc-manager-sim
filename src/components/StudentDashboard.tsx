
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, Clock, User, Building2, LogOut } from 'lucide-react';
import { SimulationSession } from '../types';

export const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SimulationSession[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    // Simulate loading previous sessions
    const mockSessions: SimulationSession[] = JSON.parse(
      localStorage.getItem(`mars_sessions_${user?.id}`) || '[]'
    );
    setSessions(mockSessions);
  };

  const startNewSimulation = async () => {
    setLoading(true);
    
    // Create new session
    const newSession: SimulationSession = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: user!.id,
      session_name: 'Mars Inc. Simulation',
      start_time: new Date().toISOString(),
      current_decision: 1,
      is_completed: false,
      total_score: 0,
      created_at: new Date().toISOString()
    };

    // Save session
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem(`mars_sessions_${user?.id}`, JSON.stringify(updatedSessions));
    
    // Navigate to simulation
    navigate(`/simulation/${newSession.id}`);
  };

  const continueSimulation = (sessionId: string) => {
    navigate(`/simulation/${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mars Inc. Simulation</h1>
                <p className="text-gray-600">Area Manager Training Program</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900">{user?.full_name}</p>
                <p className="text-xs text-gray-500">{user?.college_name}</p>
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

        {/* Start New Simulation */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Play className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready for Your Next Challenge?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Step into the role of Area Manager and navigate critical decisions as Mars Inc. 
              enters the competitive Indian chocolate market. Your strategic choices will 
              determine the success of this market expansion.
            </p>
            <button
              onClick={startNewSimulation}
              disabled={loading}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-3 mx-auto"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Play className="w-6 h-6" />
              )}
              Start New Simulation
            </button>
          </div>
        </div>

        {/* Previous Sessions */}
        {sessions.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-600" />
              Previous Sessions
            </h3>
            <div className="grid gap-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{session.session_name}</h4>
                      <p className="text-sm text-gray-600">
                        Started: {new Date(session.start_time).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.is_completed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {session.is_completed ? 'Completed' : `Decision ${session.current_decision}/3`}
                        </span>
                        {session.is_completed && (
                          <span className="flex items-center gap-1 text-sm text-gray-600">
                            <Trophy className="w-4 h-4" />
                            Score: {session.total_score}
                          </span>
                        )}
                      </div>
                    </div>
                    {!session.is_completed && (
                      <button
                        onClick={() => continueSimulation(session.id)}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
