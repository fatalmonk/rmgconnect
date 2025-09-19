-- Data Validation Constraints
-- This migration adds constraints to ensure data quality and integrity

-- Organization validation constraints
ALTER TABLE "Organization" 
ADD CONSTRAINT check_employee_count 
CHECK ("employeeCount" IS NULL OR "employeeCount"::INTEGER > 0);

ALTER TABLE "Organization" 
ADD CONSTRAINT check_compliance_score 
CHECK ("complianceScore" IS NULL OR ("complianceScore"::INTEGER >= 0 AND "complianceScore"::INTEGER <= 100));

ALTER TABLE "Organization" 
ADD CONSTRAINT check_production_capacity 
CHECK ("productionCapacity" IS NULL OR "productionCapacity"::INTEGER > 0);

-- User validation constraints
ALTER TABLE "User" 
ADD CONSTRAINT check_user_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Job validation constraints
ALTER TABLE "Job" 
ADD CONSTRAINT check_salary_range 
CHECK (salary IS NULL OR LENGTH(salary) > 0);

-- Application validation constraints
ALTER TABLE "Application" 
ADD CONSTRAINT check_application_status 
CHECK (status IN ('PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'));

-- Report validation constraints
ALTER TABLE "Report" 
ADD CONSTRAINT check_report_category 
CHECK (category IN ('FRAUD_ALERT', 'SAFETY_VIOLATION', 'LABOR_ISSUE', 'QUALITY_CONCERN', 'ENVIRONMENTAL', 'GENERAL'));

ALTER TABLE "Report" 
ADD CONSTRAINT check_report_status 
CHECK (status IN ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'PUBLISHED', 'APPEALED'));

-- Post validation constraints
ALTER TABLE "Post" 
ADD CONSTRAINT check_post_content_length 
CHECK (LENGTH(content) >= 10 AND LENGTH(content) <= 10000);

-- Comment validation constraints
ALTER TABLE "Comment" 
ADD CONSTRAINT check_comment_content_length 
CHECK (LENGTH(content) >= 1 AND LENGTH(content) <= 1000);
