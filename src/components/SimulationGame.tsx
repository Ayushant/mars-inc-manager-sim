
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DecisionScreen } from './DecisionScreen';
import { SimulationComplete } from './SimulationComplete';
import { decisionsData } from '../data/decisions';
import { SimulationSession, Decision } from '../types';

export const SimulationGame: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [session, setSession] = useState<SimulationSession | null>(null);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [currentDecision, setCurrentDecision] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!sessionId || !user) return;
    
    loadSession();
  }, [sessionId, user]);

  const loadSession = () => {
    // Load session from localStorage (in real app, this would be from Supabase)
    const sessions: SimulationSession[] = JSON.parse(
      localStorage.getItem(`mars_sessions_${user?.id}`) || '[]'
    );
    
    const currentSession = sessions.find(s => s.id === sessionId);
    if (!currentSession) {
      navigate('/student');
      return;
    }

    setSession(currentSession);
    setCurrentDecision(currentSession.current_decision);
    setIsComplete(currentSession.is_completed);

    // Load decisions
    const sessionDecisions: Decision[] = JSON.parse(
      localStorage.getItem(`mars_decisions_${sessionId}`) || '[]'
    );
    setDecisions(sessionDecisions);
  };

  const handleDecisionMade = (option: string, rationale: string, timeTaken: number) => {
    if (!session) return;

    const decisionData = decisionsData[currentDecision - 1];
    const selectedOption = decisionData.options.find(opt => opt.id === option);
    const score = selectedOption?.score || 0;

    // Create decision record
    const newDecision: Decision = {
      id: Math.random().toString(36).substr(2, 9),
      session_id: session.id,
      decision_number: currentDecision,
      decision_type: decisionData.title,
      selected_option: option,
      rationale,
      time_taken_seconds: timeTaken,
      score,
      created_at: new Date().toISOString()
    };

    // Update decisions
    const updatedDecisions = [...decisions, newDecision];
    setDecisions(updatedDecisions);
    localStorage.setItem(`mars_decisions_${sessionId}`, JSON.stringify(updatedDecisions));

    // Calculate total score
    const totalScore = updatedDecisions.reduce((sum, d) => sum + d.score, 0);

    // Update session
    const isCompleted = currentDecision >= 3;
    const updatedSession: SimulationSession = {
      ...session,
      current_decision: currentDecision + 1,
      total_score: totalScore,
      is_completed: isCompleted,
      end_time: isCompleted ? new Date().toISOString() : undefined
    };

    setSession(updatedSession);

    // Update sessions in localStorage
    const allSessions: SimulationSession[] = JSON.parse(
      localStorage.getItem(`mars_sessions_${user?.id}`) || '[]'
    );
    const sessionIndex = allSessions.findIndex(s => s.id === sessionId);
    allSessions[sessionIndex] = updatedSession;
    localStorage.setItem(`mars_sessions_${user?.id}`, JSON.stringify(allSessions));

    if (isCompleted) {
      setIsComplete(true);
    } else {
      setCurrentDecision(currentDecision + 1);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/student');
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading simulation...</p>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <SimulationComplete
        session={session}
        decisions={decisions}
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  const decisionData = decisionsData[currentDecision - 1];
  if (!decisionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Decision not found</p>
          <button 
            onClick={handleBackToDashboard}
            className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <DecisionScreen
      decision={decisionData}
      onDecisionMade={handleDecisionMade}
    />
  );
};
