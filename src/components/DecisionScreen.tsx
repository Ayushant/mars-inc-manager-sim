
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer } from './Timer';
import { ChevronRight, Award, Calendar } from 'lucide-react';
import { DecisionData } from '../types';

interface DecisionScreenProps {
  decision: DecisionData;
  onDecisionMade: (option: string, rationale: string, timeTaken: number) => void;
}

export const DecisionScreen: React.FC<DecisionScreenProps> = ({
  decision,
  onDecisionMade
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [rationale, setRationale] = useState('');
  const [startTime] = useState(Date.now());
  const [isTimerActive, setIsTimerActive] = useState(true);

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onDecisionMade(selectedOption, rationale, timeTaken);
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
    if (selectedOption) {
      handleSubmit();
    } else {
      // Auto-select first option if no selection made
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      onDecisionMade(decision.options[0].id, rationale, timeTaken);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Decision {decision.number} of 8
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Day {decision.day}
                </div>
              </div>
            </div>
            <Timer
              duration={decision.timeLimit}
              onTimeUp={handleTimeUp}
              isActive={isTimerActive}
            />
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{decision.number}/8 decisions</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(decision.number / 8) * 100}%` }}
              />
            </div>
          </div>

          {/* Decision Content */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {decision.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {decision.description}
            </p>
          </div>

          {/* Options */}
          <div className="grid gap-4 mb-8">
            {decision.options.map((option, index) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <label className={`flex items-start gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedOption === option.id 
                    ? 'border-orange-600 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                }`}>
                  <input
                    type="radio"
                    name="decision"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mt-2 w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-2 text-lg">
                      Option {option.id.toUpperCase()}: {option.text}
                    </div>
                    <div className="text-gray-600">
                      {option.description}
                    </div>
                  </div>
                </label>
              </motion.div>
            ))}
          </div>

          {/* Rationale */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Decision Rationale (Optional)
            </label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value.slice(0, 500))}
              placeholder="Explain your strategic thinking and rationale for this decision..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="text-xs text-gray-500 mt-2">
              {rationale.length}/500 characters
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={!selectedOption}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-lg"
          >
            Submit Decision
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
