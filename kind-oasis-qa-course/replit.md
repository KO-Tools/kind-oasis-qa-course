# Kind Oasis Manufacturing Quality Assurance Course

## Overview
Interactive online training course for cannabis manufacturing quality assurance. Built with React, TypeScript, and Express using an in-memory storage system. Features 14 comprehensive modules covering regulatory compliance, cGMP fundamentals, testing protocols, and quality culture development.

## Recent Changes
- **December 26, 2024**: Enhanced Module 2 with advanced interactive tools including Risk Matrix, FMEA Calculator, Facility Designer, HACCP Decision Tree, and Risk Assessment Flowchart
- **December 26, 2024**: Fixed Module 2 content display issue - replaced placeholder "About Kind Oasis" with comprehensive Product Quality Assurance curriculum
- **December 25, 2024**: Built comprehensive Module 2 Product Quality Assurance with 22 detailed sections and interactive elements
- **December 25, 2024**: Enhanced all modules with professional manufacturing imagery and two-column interactive layouts
- **December 25, 2024**: Built comprehensive Module 5 Nonconformance & Deviation Management with 20 detailed sections
- **December 25, 2024**: Built comprehensive Module 6 GMP Fundamentals with interactive facility designer tool
- **December 25, 2024**: Added clear instructions to all interactive elements and simplified risk matrix visualization
- **December 25, 2024**: Implemented two-column layout for all list sections based on user design preferences
- **December 25, 2024**: Enhanced all interactive tools with blue instruction boxes for better user guidance

## User Preferences
- **Navigation**: User prefers open access to all modules without completion barriers
- **Content**: Focus on cannabis industry-specific quality assurance training
- **Design**: Use Kind Oasis brand colors (#0F5656, #C6E4E4, #88AEAD, #FFF)
- **Functionality**: Comprehensive quiz system with progress tracking and bookmarking

## Project Architecture
### Frontend (React + TypeScript)
- **Pages**: Course main page with certificate view for completed users
- **Components**: 
  - CourseSidebar: Module navigation with progress indicators
  - ModuleContent: Dynamic content rendering with quiz integration
  - QuizComponent: Interactive assessments with score tracking
  - THCCalculator: Cannabis compliance calculation tool
  - CompletionCertificate: Downloadable completion credentials

### Backend (Express + TypeScript)
- **Storage**: In-memory data management with user progress, quiz attempts, and bookmarks
- **API Routes**: RESTful endpoints for progress tracking, quiz submissions, and data management
- **Features**: Reset functionality, bookmark system, and comprehensive progress analytics

### Content Structure
- **14 Modules**: From course overview to quality culture development
- **Interactive Elements**: THC calculator, facility design tools, checklists, rating systems
- **Assessment System**: Quizzes for modules 3-14 with 75% passing threshold
- **Progress Tracking**: Module completion, quiz scores, and time investment

## Technical Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js, TypeScript, in-memory storage
- **Build**: Vite development server with hot module replacement
- **Styling**: CSS custom properties for brand colors, responsive design patterns

## Key Features
1. **Open Navigation**: Access any module without prerequisites
2. **Progress Persistence**: Track completion status and quiz scores
3. **Interactive Learning**: Hands-on tools and simulations
4. **Mobile Responsive**: Collapsible sidebar and touch-friendly interface
5. **Certification System**: Professional completion certificates
6. **Reset Capability**: Full progress reset with confirmation safeguards