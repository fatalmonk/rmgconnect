-- Performance Optimization Indexes
-- This migration adds indexes to improve query performance for the RMG Community Hub

-- Organization indexes for better filtering and sorting
CREATE INDEX IF NOT EXISTS idx_organization_bgmea_member ON "Organization"("bgmeaMember");
CREATE INDEX IF NOT EXISTS idx_organization_verified ON "Organization"("isVerified");
CREATE INDEX IF NOT EXISTS idx_organization_type ON "Organization"("type");
CREATE INDEX IF NOT EXISTS idx_organization_country ON "Organization"("country");
CREATE INDEX IF NOT EXISTS idx_organization_created_at ON "Organization"("createdAt");

-- User indexes for role-based queries
CREATE INDEX IF NOT EXISTS idx_user_role ON "User"("role");
CREATE INDEX IF NOT EXISTS idx_user_verified ON "User"("isVerified");
CREATE INDEX IF NOT EXISTS idx_user_created_at ON "User"("createdAt");

-- Job indexes for better job search and filtering
CREATE INDEX IF NOT EXISTS idx_job_status ON "Job"("status");
CREATE INDEX IF NOT EXISTS idx_job_type ON "Job"("employmentType");
CREATE INDEX IF NOT EXISTS idx_job_created_at ON "Job"("createdAt");

-- Application indexes for tracking applications
CREATE INDEX IF NOT EXISTS idx_application_status ON "Application"("status");
CREATE INDEX IF NOT EXISTS idx_application_created_at ON "Application"("createdAt");

-- Post and Comment indexes for community features
CREATE INDEX IF NOT EXISTS idx_post_created_at ON "Post"("createdAt");
CREATE INDEX IF NOT EXISTS idx_comment_created_at ON "Comment"("createdAt");

-- Report indexes for fraud tracking
CREATE INDEX IF NOT EXISTS idx_report_category ON "Report"("category");
CREATE INDEX IF NOT EXISTS idx_report_status ON "Report"("status");
CREATE INDEX IF NOT EXISTS idx_report_created_at ON "Report"("createdAt");
