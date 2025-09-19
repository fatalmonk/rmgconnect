# 🏭 RMG Community Hub

## A comprehensive platform for the Bangladesh Ready-Made Garments industry

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://rmgconnect.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

## 🌟 Overview

RMG Community Hub is a modern, full-stack web application designed specifically for the Bangladesh Ready-Made Garments industry. It provides a comprehensive platform for connecting factories, workers, buyers, and suppliers while addressing critical industry challenges through transparency and community-driven solutions.

## 🚀 Live Demo

**Production URL:** [https://rmgconnect.vercel.app](https://rmgconnect.vercel.app)

## ✨ Key Features

### 🏢 Organization Directory

- Comprehensive database of RMG organizations
- Advanced search and filtering capabilities
- Organization profiles with verification status
- Contact information and business details

### 💼 Job Board

- Job postings from verified organizations
- Application tracking system
- Employment type filtering (Full-time, Part-time, Contract)
- Location-based job search

### 📚 Knowledge Hub

- Industry insights and best practices
- Community discussions and forums
- Resource sharing and collaboration
- Expert knowledge base

### 🛡️ Fraud Alert System

- Report suspicious activities and organizations
- Community-driven verification system
- Safety compliance tracking
- Industry watchdog functionality

### 👥 Community Features

- Member directory with verification badges
- Activity feed and community updates
- Discussion forums and knowledge sharing
- Event calendar for industry meetings

## 🛠️ Technology Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide Icons** - Beautiful, customizable icons
- **Framer Motion** - Smooth animations and transitions

### Backend & Database

- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Robust relational database
- **NextAuth.js v5** - Authentication and authorization

### Deployment & Infrastructure

- **Vercel** - Serverless deployment platform
- **GitHub** - Version control and CI/CD
- **Environment Variables** - Secure configuration management

## 📁 Project Structure

```text
RMGConnect/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── organizations/ # Organization management
│   │   ├── jobs/          # Job board API
│   │   ├── posts/         # Knowledge hub API
│   │   └── reports/       # Fraud alert API
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── directory/         # Organization directory
│   ├── jobs/              # Job board
│   ├── knowledge/         # Knowledge hub
│   ├── fraud/             # Fraud alert system
│   └── community/         # Community features
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── prisma/                # Database schema and migrations
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Vercel account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/fatalmonk/rmgconnect.git
cd rmgconnect

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up the database
npx prisma generate
npx prisma db push

# Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 👤 User Roles & Permissions

### Factory Owner

- Manage organization profile
- Post job openings
- Access fraud reporting
- View industry insights

### Worker

- Browse job opportunities
- Apply to positions
- Access knowledge hub
- Participate in community discussions

### Buyer

- Search verified organizations
- Access supplier directory
- View compliance reports
- Connect with manufacturers

### Guest User

- Browse public information
- Access knowledge hub
- View job listings
- Register for full access

## 📡 API Documentation

### Authentication Endpoints

```bash
POST /api/auth/register    # User registration
POST /api/auth/signin      # User login
POST /api/auth/signout     # User logout
```

### Organization Endpoints

```bash
GET    /api/organizations        # List organizations
POST   /api/organizations        # Create organization
GET    /api/organizations/[id]   # Get organization details
PUT    /api/organizations/[id]   # Update organization
DELETE /api/organizations/[id]   # Delete organization
```

### Job Board Endpoints

```bash
GET    /api/jobs                 # List jobs
POST   /api/jobs                 # Create job posting
GET    /api/jobs/[id]            # Get job details
PUT    /api/jobs/[id]            # Update job posting
DELETE /api/jobs/[id]            # Delete job posting
POST   /api/jobs/[id]/apply      # Apply for job
```

### Knowledge Hub Endpoints

```bash
GET    /api/posts                # List posts
POST   /api/posts                # Create post
GET    /api/posts/[id]           # Get post details
PUT    /api/posts/[id]           # Update post
DELETE /api/posts/[id]           # Delete post
GET    /api/posts/[id]/comments  # Get comments
POST   /api/posts/[id]/comments  # Add comment
```

### Fraud Alert Endpoints

```bash
GET    /api/reports              # List reports
POST   /api/reports              # Create report
GET    /api/reports/[id]         # Get report details
PUT    /api/reports/[id]         # Update report
DELETE /api/reports/[id]         # Delete report
```

## 🚀 Deployment Guide

### Vercel Deployment

1. **Connect Repository**

   ```bash
   vercel --prod
   ```

2. **Set Environment Variables**

   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Authentication secret
   - `NEXTAUTH_URL` - Production URL
   - `GOOGLE_CLIENT_ID` - Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

3. **Database Setup**

   ```bash
   npx prisma db push
   ```

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rmgconnect"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 🗄️ Database Schema

### Core Models

- **User** - User accounts and profiles
- **Organization** - RMG companies and factories
- **Job** - Job postings and opportunities
- **Application** - Job applications
- **Post** - Knowledge hub content
- **Comment** - Discussion comments
- **Report** - Fraud alert reports

### Key Relationships

- Users can belong to organizations
- Organizations can post multiple jobs
- Users can apply to multiple jobs
- Posts can have multiple comments
- Users can create multiple reports

## 🔒 Security Features

- **NextAuth.js** - Secure authentication system
- **Role-based Access Control** - User permission management
- **Input Validation** - Server-side data validation
- **SQL Injection Prevention** - Prisma ORM protection
- **XSS Protection** - React's built-in security
- **CSRF Protection** - NextAuth.js CSRF tokens
- **Environment Variables** - Secure configuration management

## 🎨 UI/UX Features

### Modern Design System

- **Glass Morphism** - Modern glass-like effects
- **Gradient Backgrounds** - Beautiful color transitions
- **Smooth Animations** - Framer Motion transitions
- **Responsive Layout** - Mobile-first design
- **Dark/Light Mode** - User preference support

### Accessibility

- **ARIA Labels** - Screen reader compatibility
- **Keyboard Navigation** - Full keyboard support
- **Color Contrast** - WCAG compliant colors
- **Focus Management** - Clear focus indicators

### Performance

- **Server-Side Rendering** - Fast initial page loads
- **Image Optimization** - Next.js automatic optimization
- **Code Splitting** - Optimized bundle sizes
- **Caching** - Efficient data caching

## 🤝 Contributing

We welcome contributions to the RMG Community Hub! Please follow these guidelines:

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write descriptive commit messages
- Update documentation as needed

### Reporting Issues

- Use GitHub Issues for bug reports
- Provide detailed reproduction steps
- Include browser and OS information

## 📈 Roadmap

### Phase 1 (Current)

- ✅ Core platform functionality
- ✅ User authentication
- ✅ Organization directory
- ✅ Job board
- ✅ Knowledge hub
- ✅ Fraud alert system

### Phase 2 (Planned)

- 🔄 Real-time notifications
- 🔄 Advanced analytics dashboard
- 🔄 Mobile application
- 🔄 API rate limiting
- 🔄 Advanced search filters

### Phase 3 (Future)

- 🔄 Machine learning recommendations
- 🔄 Blockchain verification
- 🔄 Multi-language support
- 🔄 Advanced reporting tools
- 🔄 Integration with external systems

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **BGMEA** - Bangladesh Garment Manufacturers and Exporters Association
- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment platform
- **Tailwind CSS** - For the utility-first CSS framework
- **Community Contributors** - For their valuable feedback and contributions

---

## Built with ❤️ for the Bangladesh Ready-Made Garments industry
