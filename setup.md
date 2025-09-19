# 🏭 RMG Community Hub - Setup Guide

## 📋 Prerequisites

- **Node.js** 18+
- **PostgreSQL** database
- **npm**, **yarn**, **pnpm**, or **bun**
- **Git** for version control

## 🚀 Quick Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/fatalmonk/rmgconnect.git
cd rmgconnect

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your configuration
nano .env.local
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

### 4. Start Development Server

```bash
# Run the development server
npm run dev

# Open http://localhost:3000
```

## 🏗️ Platform Features

### Organization Directory

- Comprehensive database of RMG organizations
- Advanced search and filtering capabilities
- Organization profiles with verification status
- Contact information and business details

### Job Board

- Job postings from verified organizations
- Application tracking system
- Employment type filtering (Full-time, Part-time, Contract)
- Location-based job search

### Knowledge Hub

- Industry insights and best practices
- Community discussions and forums
- Resource sharing and collaboration
- Expert knowledge base

### Fraud Alert System

- Report suspicious activities and organizations
- Community-driven verification system
- Safety compliance tracking
- Industry watchdog functionality

### Community Features

- Member directory with verification badges
- Activity feed and community updates
- Discussion forums and knowledge sharing
- Event calendar for industry meetings

## 👥 User Roles & Permissions

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

## 🚀 Deployment Options

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Docker

```bash
# Build the application
docker build -t rmgconnect .

# Run the container
docker run -p 3000:3000 rmgconnect
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check

# Database commands
npx prisma studio          # Open database GUI
npx prisma db push         # Push schema changes
npx prisma db seed         # Seed database
npx prisma generate        # Generate Prisma client
```

## 📡 API Endpoints

### Authentication

```bash
POST /api/auth/register    # User registration
POST /api/auth/signin      # User login
POST /api/auth/signout     # User logout
```

### Organizations

```bash
GET    /api/organizations        # List organizations
POST   /api/organizations        # Create organization
GET    /api/organizations/[id]   # Get organization details
PUT    /api/organizations/[id]   # Update organization
DELETE /api/organizations/[id]   # Delete organization
```

### Jobs

```bash
GET    /api/jobs                 # List jobs
POST   /api/jobs                 # Create job posting
GET    /api/jobs/[id]            # Get job details
PUT    /api/jobs/[id]            # Update job posting
DELETE /api/jobs/[id]            # Delete job posting
POST   /api/jobs/[id]/apply      # Apply for job
```

### Posts (Knowledge Hub)

```bash
GET    /api/posts                # List posts
POST   /api/posts                # Create post
GET    /api/posts/[id]           # Get post details
PUT    /api/posts/[id]           # Update post
DELETE /api/posts/[id]           # Delete post
GET    /api/posts/[id]/comments  # Get comments
POST   /api/posts/[id]/comments  # Add comment
```

### Reports (Fraud Alert)

```bash
GET    /api/reports              # List reports
POST   /api/reports              # Create report
GET    /api/reports/[id]         # Get report details
PUT    /api/reports/[id]         # Update report
DELETE /api/reports/[id]         # Delete report
```

## 🔒 Security Features

### Authentication & Authorization

- **NextAuth.js** - Secure authentication system
- **Role-based Access Control** - User permission management
- **Session Management** - Secure session handling
- **Password Hashing** - bcrypt password encryption

### Data Protection

- **Input Validation** - Server-side data validation
- **SQL Injection Prevention** - Prisma ORM protection
- **XSS Protection** - React's built-in security
- **CSRF Protection** - NextAuth.js CSRF tokens

### Environment Security

- **Environment Variables** - Secure configuration management
- **API Key Protection** - Secure API key storage
- **Database Security** - PostgreSQL security best practices

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

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Errors

```bash
# Check database connection
npx prisma db pull

# Reset database
npx prisma db push --force-reset
```

#### Authentication Issues

```bash
# Check environment variables
echo $NEXTAUTH_SECRET
echo $NEXTAUTH_URL

# Restart development server
npm run dev
```

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Performance Optimization

#### Database Optimization

```bash
# Analyze query performance
npx prisma studio

# Add database indexes
npx prisma db push
```

#### Bundle Optimization

```bash
# Analyze bundle size
npm run build
npx next-bundle-analyzer

# Optimize images
npm run dev
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🤝 Support

For technical support and questions:

- **GitHub Issues** - [Report bugs and feature requests](https://github.com/fatalmonk/rmgconnect/issues)
- **Documentation** - Check this setup guide and README.md
- **Community** - Join our discussion forums

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
