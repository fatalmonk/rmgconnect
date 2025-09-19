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
# or
yarn install
# or
pnpm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/rmgconnect?schema=public"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-a-random-string"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# File Upload (Optional)
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="10485760" # 10MB
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (for development)
npx prisma db push

# Seed the database with sample data
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌟 Platform Features

### 🏢 **Organization Directory**
- Browse and search RMG organizations
- Filter by organization type and location
- View detailed organization profiles
- Contact information and verification status

### 💼 **Job Board**
- Job postings from verified organizations
- Advanced search and filtering
- Application tracking system
- Employment type categorization

### 📚 **Knowledge Hub**
- Industry best practices and guidelines
- Educational content and resources
- Community discussions and Q&A
- Expert insights and case studies

### 🚨 **Fraud Alert System**
- Anonymous reporting mechanism
- Fraud prevention and awareness
- Safety violation reporting
- Labor issue documentation
- Quality concern tracking

### 👤 **User Management**
- Role-based access control
- User verification system
- Organization affiliation
- Profile management

## 👥 User Roles & Permissions

### **Factory Owner** 🏭
- Manage organization profile
- Post job opportunities
- Access fraud reporting
- View industry insights
- Manage company information

### **Worker** 👷
- Browse job opportunities
- Apply for positions
- Access educational resources
- Report workplace issues
- Update personal profile

### **Buyer** 🛒
- Search verified organizations
- Access quality reports
- Connect with suppliers
- Industry networking
- View compliance data

### **Guest** 👤
- Browse public information
- Access knowledge hub
- View published reports
- Limited functionality
- Read-only access

### **Admin** 👑
- Full platform access
- User management
- Content moderation
- System configuration
- Analytics and reporting

## 🗄️ Database Schema

### **Core Models**

```prisma
User {
  id, name, email, role, organizationId
  // Relations: organization, jobs, applications, posts, comments, reports
}

Organization {
  id, name, type, description, country, website
  // Relations: users, jobs
}

Job {
  id, title, description, location, salary, employmentType
  // Relations: organization, author, applications
}

Post {
  id, title, content, excerpt, published
  // Relations: author, comments
}

Report {
  id, title, description, category, severity, status
  // Relations: author
}
```

### **Key Relationships**
- Users belong to Organizations
- Organizations post Jobs
- Users apply for Jobs
- Users create Posts and Comments
- Users submit Reports

## 🚀 Deployment

### **Vercel Deployment (Recommended)**

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Configure Environment Variables**
   In your Vercel dashboard, set:
   - `DATABASE_URL` - Your production database URL
   - `NEXTAUTH_URL` - Your production domain
   - `NEXTAUTH_SECRET` - A secure random string
   - `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET` - Your Google OAuth client secret

3. **Deploy**
   ```bash
   vercel --prod
   ```

### **Alternative Deployment Options**

- **Railway** - Easy PostgreSQL + Node.js deployment
- **Supabase** - PostgreSQL with built-in authentication
- **PlanetScale** - MySQL-compatible database
- **DigitalOcean** - VPS deployment

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Database
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma db seed   # Seed database
npx prisma migrate   # Run migrations

# Deployment
vercel               # Deploy to Vercel
vercel --prod        # Deploy to production
```

## 🛠️ API Endpoints

### **Organizations**
```
GET    /api/organizations          # List organizations
POST   /api/organizations          # Create organization
GET    /api/organizations/[id]     # Get organization details
PUT    /api/organizations/[id]     # Update organization
DELETE /api/organizations/[id]     # Delete organization
```

### **Jobs**
```
GET    /api/jobs                   # List job postings
POST   /api/jobs                   # Create job posting
GET    /api/jobs/[id]              # Get job details
PUT    /api/jobs/[id]              # Update job
DELETE /api/jobs/[id]              # Delete job
POST   /api/jobs/[id]/apply        # Apply for job
GET    /api/jobs/[id]/apply        # Check application status
```

### **Knowledge Hub**
```
GET    /api/posts                  # List posts
POST   /api/posts                  # Create post
GET    /api/posts/[id]             # Get post details
PUT    /api/posts/[id]             # Update post
DELETE /api/posts/[id]             # Delete post
GET    /api/posts/[id]/comments    # Get post comments
POST   /api/posts/[id]/comments    # Add comment
```

### **Fraud Reports**
```
GET    /api/reports                # List reports
POST   /api/reports                # Create report
GET    /api/reports/[id]           # Get report details
PUT    /api/reports/[id]           # Update report
DELETE /api/reports/[id]           # Delete report
```

## 🔒 Security Features

- **Authentication** - NextAuth.js with multiple providers
- **Authorization** - Role-based access control
- **Data Validation** - Input sanitization and validation
- **CSRF Protection** - Built-in Next.js security
- **Environment Variables** - Secure configuration management
- **Rate Limiting** - API endpoint protection
- **Input Sanitization** - XSS prevention

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG 2.1 compliant
- **Performance** - Optimized loading and rendering
- **Modern Design** - Clean, professional interface
- **Dark Mode** - User preference support
- **Smooth Animations** - Framer Motion integration

## 🐛 Troubleshooting

### **Common Issues**

1. **Database Connection Error**
   ```bash
   # Check DATABASE_URL format
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```

2. **Authentication Issues**
   ```bash
   # Ensure NEXTAUTH_SECRET is set
   NEXTAUTH_SECRET="your-secret-key"
   ```

3. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Prisma Errors**
   ```bash
   # Regenerate Prisma client
   npx prisma generate
   npx prisma db push
   ```

### **Getting Help**

- **GitHub Issues** - [Create an issue](https://github.com/fatalmonk/rmgconnect/issues)
- **Documentation** - Check the `/docs` folder
- **Community** - Join our discussions
- **Email Support** - Contact through GitHub profile

## 📊 Performance Optimization

- **Static Generation** - Pre-rendered pages where possible
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic bundle optimization
- **Caching** - Efficient data fetching
- **CDN** - Vercel Edge Network

## 🔄 Version Control

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

## 📈 Analytics & Monitoring

- **Vercel Analytics** - Built-in performance monitoring
- **Error Tracking** - Automatic error reporting
- **User Analytics** - Privacy-focused tracking
- **Performance Metrics** - Core Web Vitals

---

**🎯 Ready to build the future of the RMG industry!**

*For more information, visit [https://rmgconnect.vercel.app](https://rmgconnect.vercel.app)*