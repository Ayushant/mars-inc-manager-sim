
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import { SimulationSession, Decision } from '../types';
import { decisionsData } from '../data/decisions';

interface SimulationCompleteProps {
  session: SimulationSession;
  decisions: Decision[];
  onBackToDashboard: () => void;
}

export const SimulationComplete: React.FC<SimulationCompleteProps> = ({
  session,
  decisions,
  onBackToDashboard
}) => {
  const maxScore = decisionsData.reduce((sum, d) => sum + Math.max(...d.options.map(o => o.score)), 0);
  const scorePercentage = (session.total_score / maxScore) * 100;
  
  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Outstanding', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { level: 'Excellent', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 70) return { level: 'Good', color: 'text-orange-600', bg: 'bg-orange-100' };
    if (percentage >= 60) return { level: 'Satisfactory', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const performance = getPerformanceLevel(scorePercentage);
  const totalTime = decisions.reduce((sum, d) => sum + d.time_taken_seconds, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Simulation Complete!
          </h1>
          <p className="text-gray-600">
            Congratulations on completing the Mars Inc. Area Manager simulation
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-orange-600 mb-2">
              {session.total_score}
            </div>
            <div className="text-gray-600 mb-4">
              out of {maxScore} points ({scorePercentage.toFixed(1)}%)
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${performance.bg} ${performance.color} font-semibold`}>
              <Star className="w-5 h-5" />
              {performance.level}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {Math.floor(totalTime / 60)}m {totalTime % 60}s
              </div>
              <div className="text-gray-600">Total Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {decisions.length}/3
              </div>
              <div className="text-gray-600">Decisions Made</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {Math.round(decisions.reduce((sum, d) => sum + d.time_taken_seconds, 0) / decisions.length)}s
              </div>
              <div className="text-gray-600">Avg. Decision Time</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Performance Score</span>
              <span>{scorePercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${scorePercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-orange-600 h-3 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Decision Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Decision Breakdown</h2>
          <div className="space-y-6">
            {decisions.map((decision, index) => {
              const decisionData = decisionsData[index];
              const selectedOption = decisionData.options.find(opt => opt.id === decision.selected_option);
              
              return (
                <motion.div
                  key={decision.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.2 }}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Decision {decision.decision_number}: {decisionData.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Selected: Option {decision.selected_option.toUpperCase()} - {selectedOption?.text}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">
                        {decision.score} pts
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.floor(decision.time_taken_seconds / 60)}m {decision.time_taken_seconds % 60}s
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 font-medium mb-2">Strategic Insight:</p>
                    <p className="text-sm text-gray-600">{selectedOption?.reasoning}</p>
                  </div>

                  {decision.rationale && (
                    <div className="mt-4 bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-700 font-medium mb-2">Your Rationale:</p>
                      <p className="text-sm text-blue-600">{decision.rationale}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={onBackToDashboard}
            className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Back to Dashboard
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            onClick={() => window.location.reload()}
            className="bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
