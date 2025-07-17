
export interface User {
  id: string;
  email: string;
  role: 'student' | 'admin';
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
