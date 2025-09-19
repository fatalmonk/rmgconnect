-- Analytics Views and Functions
-- This migration adds analytics capabilities for the RMG Community Hub

-- Manufacturing Industry Statistics View
CREATE OR REPLACE VIEW manufacturing_stats AS
SELECT 
  type,
  COUNT(*) as total_companies,
  AVG("employeeCount") as avg_employees,
  SUM(CASE WHEN "bgmeaVerified" = true THEN 1 ELSE 0 END) as verified_count,
  SUM(CASE WHEN "greenFactory" = true THEN 1 ELSE 0 END) as green_factories,
  AVG("complianceScore") as avg_compliance_score
FROM "Organization" 
GROUP BY type;

-- BGMEA Member Statistics View
CREATE OR REPLACE VIEW bgmea_stats AS
SELECT 
  COUNT(*) as total_bgmea_members,
  SUM(CASE WHEN "bgmeaVerified" = true THEN 1 ELSE 0 END) as verified_members,
  AVG("employeeCount") as avg_employees_per_factory,
  AVG("complianceScore") as avg_compliance_score,
  SUM(CASE WHEN "greenFactory" = true THEN 1 ELSE 0 END) as green_factories
FROM "Organization" 
WHERE "bgmeaMember" = true;

-- Export Performance by Region View
CREATE OR REPLACE VIEW export_performance AS
SELECT 
  "exportCountries",
  COUNT(*) as manufacturer_count,
  AVG("complianceScore") as avg_compliance,
  AVG("employeeCount") as avg_employees,
  SUM(CASE WHEN "greenFactory" = true THEN 1 ELSE 0 END) as green_factories
FROM "Organization" 
WHERE "bgmeaMember" = true AND "exportCountries" IS NOT NULL
GROUP BY "exportCountries"
ORDER BY manufacturer_count DESC;

-- User Activity Statistics View
CREATE OR REPLACE VIEW user_activity_stats AS
SELECT 
  role,
  COUNT(*) as total_users,
  SUM(CASE WHEN "isVerified" = true THEN 1 ELSE 0 END) as verified_users,
  AVG(EXTRACT(EPOCH FROM (NOW() - "createdAt"))/86400) as avg_days_since_registration
FROM "User" 
GROUP BY role;

-- Job Market Statistics View
CREATE OR REPLACE VIEW job_market_stats AS
SELECT 
  status,
  COUNT(*) as total_jobs,
  AVG(EXTRACT(EPOCH FROM (NOW() - "createdAt"))/86400) as avg_days_since_posted
FROM "Job" 
GROUP BY status;

-- Function to get organization compliance summary
CREATE OR REPLACE FUNCTION get_organization_compliance_summary(org_id TEXT)
RETURNS TABLE (
  compliance_score INTEGER,
  last_audit TIMESTAMP,
  green_factory BOOLEAN,
  bgmea_verified BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o."complianceScore",
    o.lastAudit,
    o."greenFactory",
    o."bgmeaVerified"
  FROM "Organization" o
  WHERE o.id = org_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get industry trends
CREATE OR REPLACE FUNCTION get_industry_trends(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
  metric_name TEXT,
  metric_value NUMERIC,
  trend_direction TEXT
) AS $$
BEGIN
  RETURN QUERY
  WITH recent_data AS (
    SELECT 
      COUNT(*) as recent_organizations,
      AVG("complianceScore") as recent_avg_compliance,
      SUM(CASE WHEN "greenFactory" = true THEN 1 ELSE 0 END) as recent_green_factories
    FROM "Organization" 
    WHERE "createdAt" >= NOW() - INTERVAL '1 day' * days_back
  ),
  historical_data AS (
    SELECT 
      COUNT(*) as historical_organizations,
      AVG("complianceScore") as historical_avg_compliance,
      SUM(CASE WHEN "greenFactory" = true THEN 1 ELSE 0 END) as historical_green_factories
    FROM "Organization" 
    WHERE "createdAt" < NOW() - INTERVAL '1 day' * days_back
  )
  SELECT 
    'New Organizations'::TEXT,
    rd.recent_organizations,
    CASE 
      WHEN rd.recent_organizations > hd.historical_organizations THEN 'up'
      WHEN rd.recent_organizations < hd.historical_organizations THEN 'down'
      ELSE 'stable'
    END
  FROM recent_data rd, historical_data hd
  UNION ALL
  SELECT 
    'Avg Compliance Score'::TEXT,
    rd.recent_avg_compliance,
    CASE 
      WHEN rd.recent_avg_compliance > hd.historical_avg_compliance THEN 'up'
      WHEN rd.recent_avg_compliance < hd.historical_avg_compliance THEN 'down'
      ELSE 'stable'
    END
  FROM recent_data rd, historical_data hd
  UNION ALL
  SELECT 
    'Green Factories'::TEXT,
    rd.recent_green_factories,
    CASE 
      WHEN rd.recent_green_factories > hd.historical_green_factories THEN 'up'
      WHEN rd.recent_green_factories < hd.historical_green_factories THEN 'down'
      ELSE 'stable'
    END
  FROM recent_data rd, historical_data hd;
END;
$$ LANGUAGE plpgsql;
