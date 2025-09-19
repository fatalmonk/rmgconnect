# 🏭 RMG Community Hub

**A comprehensive platform for the Bangladesh Ready-Made Garments industry**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://rmgconnect.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

## 🌟 Overview

RMG Community Hub is a modern, full-stack web application designed specifically for the Bangladesh Ready-Made Garments industry. It provides a comprehensive platform for connecting factories, workers, buyers, and suppliers while addressing critical industry challenges through transparency and community-driven solutions.

## 🚀 Live Demo

**Production URL:** [https://rmgconnect.vercel.app](https://rmgconnect.vercel.app)

## ✨ Key Features

### 🏢 **Organization Directory**
- Comprehensive database of RMG organizations
- Advanced search and filtering capabilities
- Organization profiles with verification status
- Contact information and business details

### 💼 **Job Board**
- Job postings from verified organizations
- Application tracking system
- Employment type filtering (Full-time, Part-time, Contract)
- Location-based job search

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

### 👥 **User Management**
- Role-based access control
- User verification system
- Organization affiliation
- Profile management

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### **Backend**
- **Next.js API Routes** - Serverless functions
- **Prisma ORM** - Database management
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication system

### **Deployment**
- **Vercel** - Hosting and deployment
- **GitHub** - Version control
- **Environment Variables** - Secure configuration

## 🏗️ Project Structure

```
rmgconnect/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── jobs/          # Job management
│   │   ├── organizations/ # Organization management
│   │   ├── posts/         # Knowledge hub posts
│   │   └── reports/       # Fraud reports
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── directory/         # Organization directory
│   ├── jobs/              # Job board
│   ├── knowledge/         # Knowledge hub
│   └── fraud/             # Fraud alerts
├── components/            # Reusable components
│   └── ui/               # UI components
├── lib/                   # Utility libraries
├── prisma/               # Database schema
└── types/                # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- PostgreSQL database
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fatalmonk/rmgconnect.git
   cd rmgconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/rmgconnect"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 User Roles

### **Factory Owner**
- Manage organization profile
- Post job opportunities
- Access fraud reporting
- View industry insights

### **Worker**
- Browse job opportunities
- Apply for positions
- Access educational resources
- Report workplace issues

### **Buyer**
- Search verified organizations
- Access quality reports
- Connect with suppliers
- Industry networking

### **Guest**
- Browse public information
- Access knowledge hub
- View published reports
- Limited functionality

## 🔧 API Endpoints

### **Organizations**
- `GET /api/organizations` - List organizations
- `POST /api/organizations` - Create organization
- `GET /api/organizations/[id]` - Get organization details
- `PUT /api/organizations/[id]` - Update organization

### **Jobs**
- `GET /api/jobs` - List job postings
- `POST /api/jobs` - Create job posting
- `GET /api/jobs/[id]` - Get job details
- `POST /api/jobs/[id]/apply` - Apply for job

### **Knowledge Hub**
- `GET /api/posts` - List posts
- `POST /api/posts` - Create post
- `GET /api/posts/[id]` - Get post details
- `POST /api/posts/[id]/comments` - Add comment

### **Fraud Reports**
- `GET /api/reports` - List reports
- `POST /api/reports` - Create report
- `GET /api/reports/[id]` - Get report details

## 🚀 Deployment

### **Vercel Deployment**

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Configure Environment Variables**
   Set up the following in your Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 📊 Database Schema

### **Core Models**
- **User** - User accounts and profiles
- **Organization** - RMG organizations and factories
- **Job** - Job postings and opportunities
- **Application** - Job applications
- **Post** - Knowledge hub content
- **Comment** - Post comments and discussions
- **Report** - Fraud and safety reports

### **Key Relationships**
- Users belong to Organizations
- Organizations post Jobs
- Users apply for Jobs
- Users create Posts and Comments
- Users submit Reports

## 🔒 Security Features

- **Authentication** - NextAuth.js with multiple providers
- **Authorization** - Role-based access control
- **Data Validation** - Input sanitization and validation
- **CSRF Protection** - Built-in Next.js security
- **Environment Variables** - Secure configuration management

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - User preference support
- **Accessibility** - WCAG 2.1 compliant
- **Performance** - Optimized loading and rendering
- **Modern Design** - Clean, professional interface

## 🤝 Contributing

We welcome contributions to improve the RMG Community Hub! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For hosting and deployment
- **Prisma** - For the excellent ORM
- **Tailwind CSS** - For the utility-first CSS framework
- **Bangladesh RMG Industry** - For the inspiration and use case

## 📞 Support

For support and questions:
- **GitHub Issues** - [Create an issue](https://github.com/fatalmonk/rmgconnect/issues)
- **Email** - Contact through GitHub profile
- **Documentation** - Check the `/docs` folder

## 🌟 Roadmap

### **Phase 1** ✅ (Completed)
- [x] Basic platform structure
- [x] User authentication
- [x] Organization directory
- [x] Job board
- [x] Knowledge hub
- [x] Fraud reporting

### **Phase 2** 🔄 (In Progress)
- [ ] Advanced search and filtering
- [ ] Real-time notifications
- [ ] Mobile app development
- [ ] API documentation

### **Phase 3** 📋 (Planned)
- [ ] Machine learning recommendations
- [ ] Advanced analytics dashboard
- [ ] Integration with external systems
- [ ] Multi-language support

---

**Made with ❤️ for the Bangladesh Ready-Made Garments Industry**

*Empowering transparency, safety, and growth in the RMG sector*