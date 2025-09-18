# RMGConnect Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rmgconnect?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# File Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="10485760" # 10MB
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

## Features

- **User Authentication**: Sign up, sign in, and role-based access control
- **Fraud Reporting**: Submit detailed fraud reports with evidence uploads
- **Report Management**: View, filter, and manage fraud reports
- **Admin Panel**: Review and moderate reports
- **Public Browsing**: Browse published fraud reports

## User Roles

- **ADMIN**: Full access to all features and admin panel
- **REVIEWER**: Can review and moderate reports
- **FACTORY**: Can submit and view their own reports
- **SUPPLIER**: Can submit and view their own reports
- **BUYER**: Can submit and view their own reports
- **BRAND**: Can submit and view their own reports
- **RETAILER**: Can submit and view their own reports

## Default Users

After running the seed script, you can log in with:

- **Admin**: `admin@rmgconnect.com` / `admin123`
- **Factory**: `factory@example.com` / `factory123`
- **Buyer**: `buyer@example.com` / `buyer123`

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

Make sure to set these in your production environment:

- `DATABASE_URL`: Your production database URL
- `NEXTAUTH_URL`: Your production domain
- `NEXTAUTH_SECRET`: A secure random string
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure your DATABASE_URL is correct
2. **Authentication**: Check that NEXTAUTH_SECRET is set
3. **File Uploads**: Ensure UPLOAD_DIR exists and is writable
4. **Environment Variables**: Verify all required variables are set

### Getting Help

- Check the console for error messages
- Verify environment variables are loaded correctly
- Ensure database is accessible and migrations are run