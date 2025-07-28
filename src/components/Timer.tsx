
import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
  showProgress?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive, showProgress = false }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((duration - timeLeft) / duration) * 100;
  };

  const isWarning = timeLeft < 300; // 5 minutes
  const isCritical = timeLeft < 120; // 2 minutes

  return (
    <div className="space-y-2">
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
        isCritical ? 'bg-red-100 text-red-700' : 
        isWarning ? 'bg-yellow-100 text-yellow-700' : 
        'bg-orange-100 text-orange-700'
      }`}>
        {isCritical ? (
          <AlertTriangle className="w-5 h-5 animate-pulse" />
        ) : (
          <Clock className="w-5 h-5" />
        )}
        <span className="text-lg">
          {formatTime(timeLeft)}
        </span>
      </div>
      
      {showProgress && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              isCritical ? 'bg-red-500' : 
              isWarning ? 'bg-yellow-500' : 
              'bg-orange-500'
            }`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      )}
    </div>
  );
};

// Quiz Timer Component (20 minutes)
export const QuizTimer: React.FC<{ onTimeUp: () => void; isActive: boolean }> = ({ onTimeUp, isActive }) => {
  const QUIZ_DURATION = 20 * 60; // 20 minutes in seconds
  
  return (
    <Timer 
      duration={QUIZ_DURATION} 
      onTimeUp={onTimeUp} 
      isActive={isActive}
      showProgress={true}
    />
  );
};
