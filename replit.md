# Portfolio Website

## Overview

This is a modern, responsive portfolio website built for Atique Ahmad, a Software Engineer specializing in AI/Data Science. The application is a full-stack solution featuring a React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and dark mode support
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **API Design**: RESTful API endpoints for contact form submissions

### Design System
- **Component Library**: Custom implementation using shadcn/ui
- **Theme**: "new-york" style with neutral color palette
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Typography**: CSS custom properties for consistent theming

## Key Components

### Frontend Components
1. **Layout Components**
   - Navigation with smooth scrolling and mobile menu
   - Footer with social links and site map
   
2. **Content Sections**
   - Hero section with professional introduction
   - About section with personal background
   - Education section showcasing academic credentials
   - Experience section with professional timeline
   - Skills section with categorized technical expertise
   - Projects section highlighting key work
   - Contact section with form integration

3. **UI Components**
   - Comprehensive shadcn/ui component library
   - Custom theme provider for dark/light mode
   - Toast notifications for user feedback
   - Mobile-responsive design patterns

### Backend Components
1. **API Routes**
   - POST `/api/contact` - Contact form submission
   - GET `/api/contacts` - Retrieve all contacts (admin endpoint)

2. **Data Layer**
   - In-memory storage implementation (MemStorage)
   - Drizzle schema definitions for PostgreSQL
   - Type-safe database operations

3. **Middleware**
   - Request logging and performance monitoring
   - JSON body parsing
   - Error handling with structured responses

## Data Flow

### Contact Form Submission
1. User fills out contact form with validation
2. Form data validated using Zod schema on client
3. API request sent to `/api/contact` endpoint
4. Server validates data using shared schema
5. Contact stored in database/memory storage
6. Success/error response returned to client
7. User feedback displayed via toast notifications

### Development Workflow
1. Vite development server serves React application
2. Express server handles API requests and serves static files
3. Hot module replacement for fast development iteration
4. Type checking across client/server/shared modules

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: react, react-dom, @types/react
- **Backend**: express, @types/express
- **Database**: drizzle-orm, @neondatabase/serverless
- **Validation**: zod, @hookform/resolvers
- **Build Tools**: vite, typescript, esbuild

### UI/UX Dependencies
- **Component Library**: @radix-ui/* components
- **Styling**: tailwindcss, class-variance-authority, clsx
- **Icons**: lucide-react
- **State Management**: @tanstack/react-query
- **Routing**: wouter

### Development Dependencies
- **Type Safety**: TypeScript with strict configuration
- **Code Quality**: ESLint, Prettier (implied)
- **Development Tools**: tsx for development server

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Asset Optimization**: Vite handles code splitting and asset optimization

### Environment Configuration
- Development: tsx server with hot reloading
- Production: Node.js serves compiled Express application
- Database: PostgreSQL via DATABASE_URL environment variable

### Hosting Considerations
- Static assets served from `dist/public`
- API routes handled by Express server
- Database migrations managed via Drizzle Kit
- Environment variables for configuration

## Changelog
- July 06, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.