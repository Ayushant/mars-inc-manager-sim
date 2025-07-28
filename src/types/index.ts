
export interface User {
  id: string;
  email: string;
  role: 'student' | 'admin' | 'super_admin';
  full_name?: string;
  college_name?: string;
}

export interface SimulationSession {
  id: string;
  user_id: string;
  session_name: string;
  start_time: string;
  end_time?: string;
  current_decision: number;
  is_completed: boolean;
  total_score: number;
  created_at: string;
}

export interface Decision {
  id: string;
  session_id: string;
  decision_number: number;
  decision_type: string;
  selected_option: string;
  rationale?: string;
  time_taken_seconds: number;
  score: number;
  created_at: string;
}

export interface DecisionData {
  number: number;
  title: string;
  description: string;
  timeLimit: number;
  day: number;
  options: Array<{
    id: string;
    text: string;
    description: string;
    score: number;
    reasoning: string;
  }>;
}

export interface AdminAnalytics {
  totalStudents: number;
  activeSessions: number;
  completedSessions: number;
  averageScore: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: QuizQuestion[];
  created_at: string;
  created_by: string;
  is_active: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  points: number;
}

export interface License {
  id: string;
  college_name: string;
  max_students: number;
  current_students: number;
  expires_at: string;
  is_active: boolean;
}
