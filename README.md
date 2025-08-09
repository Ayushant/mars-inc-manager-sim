
# Mars Inc. Area Manager Simulation

A comprehensive web-based simulation platform for training area managers in strategic decision-making scenarios. This React-based frontend application provides role-based dashboards for students, administrators, and super administrators.

## 🚀 Project Overview

This simulation platform allows students to experience real-world business scenarios as Mars Inc. area managers entering the Indian chocolate market. The application supports multiple user roles with different levels of access and functionality.

## 🏗️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Icons**: Lucide React
- **Data Visualization**: Recharts

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── AdminDashboard.tsx
│   ├── StudentDashboard.tsx
│   ├── SuperAdminDashboard.tsx
│   ├── LoginScreen.tsx
│   ├── SimulationGame.tsx
│   ├── DecisionScreen.tsx
│   ├── Timer.tsx
│   └── ProtectedRoute.tsx
├── contexts/            # React Context providers
│   └── AuthContext.tsx
├── data/               # Static data and configurations
│   └── decisions.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── lib/                # Utility functions
    └── utils.ts
```

## 👥 User Roles & Access Levels

### 1. Student Role
- Access simulation games
- View personal session history
- Complete decision-making scenarios
- View performance scores

### 2. Admin Role (University/College Level)
- Manage students within their institution
- Control quiz/simulation start/stop for students
- View student progress and performance
- Add new students to the platform

### 3. Super Admin Role
- Manage university/college licenses
- Add new institutions
- Global system administration
- View all system analytics

## 🔄 User Flow

### Authentication Flow
```
1. User lands on Login Screen (/)
2. Selects role: Student or Admin
3. Enters credentials
4. System redirects based on role:
   - Student → /student
   - Admin → /admin
   - Super Admin → /super-admin (admin@ed.com / 232354)
```

### Student Journey
```
1. Login → Student Dashboard
2. View previous sessions or start new simulation
3. Simulation Game → 8 decision scenarios
4. Each decision includes:
   - Scenario description
   - Multiple choice options
   - Timer (time limit varies)
   - Rationale input (optional)
5. Completion → Results summary with score
6. Return to dashboard for new sessions
```

### Admin Journey
```
1. Login → Admin Dashboard
2. University-level controls:
   - Universal start/stop quiz buttons
   - Student management
3. Per-student controls:
   - Individual start/stop buttons
   - Performance monitoring
4. Add new students with details:
   - Full name, email, student ID
   - College/department information
```

### Super Admin Journey
```
1. Access with default credentials
2. Super Admin Dashboard
3. License management:
   - Add new university/college licenses
   - Set expiry dates and student limits
   - Configure institutional access
```

## 🎮 Simulation Game Features

### Decision Scenarios
- **Total Decisions**: 8 scenarios per simulation
- **Time Limits**: Variable per decision (30-120 seconds)
- **Scoring System**: Points based on strategic choice quality
- **Progress Tracking**: Real-time progress bar and decision counter

### Decision Components
- Scenario context and background
- Multiple choice options (typically 3-4 options)
- Strategic rationale input field
- Timer with auto-submission
- Score calculation and feedback

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd mars-simulation

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

## 🔌 Pending Backend Integration

### Current State: Frontend Only
This project currently uses **localStorage** for data persistence and **mock authentication**. For production deployment, the following backend integrations are required:

### 🚨 Required Backend Components

#### 1. Authentication System
**Current**: Mock login with hardcoded credentials
**Needed**: 
- JWT-based authentication
- Password hashing and validation
- Session management
- Role-based access control (RBAC)

#### 2. Database Schema
**Tables Required**:

```sql
-- Users table
users (
  id, email, password_hash, role, full_name, 
  college_name, created_at, updated_at
)

-- Simulation sessions
simulation_sessions (
  id, user_id, session_name, start_time, end_time,
  current_decision, total_score, is_completed, created_at
)

-- Decision records
decisions (
  id, session_id, decision_number, decision_type,
  selected_option, rationale, time_taken_seconds, 
  score, created_at
)

-- Licenses/Institutions
licenses (
  id, institution_name, admin_email, admin_password_hash,
  total_student_limit, expiry_date, is_active, created_at
)

-- Student-Institution relationships
student_licenses (
  id, user_id, license_id, assigned_at
)
```

#### 3. API Endpoints Needed

```typescript
// Authentication
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

// User Management
GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id

// Simulation Management
GET    /api/simulations
POST   /api/simulations
GET    /api/simulations/:id
PUT    /api/simulations/:id

// Decision Tracking
POST   /api/decisions
GET    /api/decisions/session/:sessionId

// License Management (Super Admin)
GET    /api/licenses
POST   /api/licenses
PUT    /api/licenses/:id
DELETE /api/licenses/:id

// Admin Controls
POST   /api/admin/start-quiz
POST   /api/admin/stop-quiz
GET    /api/admin/students
```

#### 4. Real-time Features
**Needed**:
- WebSocket connections for live quiz control
- Real-time student status updates
- Live simulation monitoring for admins

#### 5. Email Integration
**Current**: Console log simulation
**Needed**:
- Welcome email service
- Password reset emails
- Notification system

#### 6. File Storage
**Needed**:
- User profile images
- Institution logos
- Simulation assets and media

### 🎯 Recommended Backend Stack

#### Option 1: Supabase (Recommended)
- **Authentication**: Built-in auth with RLS
- **Database**: PostgreSQL with real-time subscriptions
- **Storage**: File storage for assets
- **Edge Functions**: Custom business logic

#### Option 2: Custom Backend
- **Database**: PostgreSQL/MySQL
- **API**: Node.js with Express/Fastify
- **Authentication**: JWT with bcrypt
- **Real-time**: Socket.io or WebSockets

## 🔄 Data Flow Architecture

### Current Frontend Data Flow
```
LoginScreen → AuthContext → Protected Routes → Component States → localStorage
```

### Required Backend Data Flow
```
Frontend → API Layer → Authentication Middleware → Database → Response
                    ↓
                WebSocket → Real-time Updates
```

## 🚀 Deployment Considerations

### Frontend Deployment
- Static hosting (Vercel, Netlify, AWS S3)
- CDN integration for assets
- Environment variable configuration

### Backend Deployment
- Server hosting (AWS, DigitalOcean, Railway)
- Database hosting with backups
- SSL certificates and security headers
- Monitoring and logging systems

## 🧪 Testing Strategy

### Frontend Testing (To Implement)
- Unit tests for components
- Integration tests for user flows
- E2E testing for critical paths

### Backend Testing (To Implement)
- API endpoint testing
- Database integration tests
- Authentication flow testing
- Performance and load testing

## 📝 Development Roadmap

### Phase 1: Backend Foundation
1. Set up authentication system
2. Create database schema
3. Implement core API endpoints
4. Add basic security measures

### Phase 2: Feature Integration
1. Replace localStorage with API calls
2. Implement real-time features
3. Add email notifications
4. Create admin management tools

### Phase 3: Production Readiness
1. Performance optimization
2. Security hardening
3. Monitoring and analytics
4. Backup and disaster recovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request
5. Ensure all checks pass

## 📞 Support

For technical questions or backend integration assistance, please refer to the project documentation or contact the development team.

---

**Note**: This is currently a frontend-only implementation. Backend integration is required for production deployment with real user data and authentication.
