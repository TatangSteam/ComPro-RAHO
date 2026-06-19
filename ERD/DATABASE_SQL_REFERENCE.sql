-- ============================================================================
-- RAHO CLUB PREMIER - DATABASE SQL REFERENCE
-- PostgreSQL Database Schema
-- ============================================================================

-- Drop existing tables (use with caution!)
-- DROP TABLE IF EXISTS "Article" CASCADE;
-- DROP TABLE IF EXISTS "CompanyProfile" CASCADE;
-- DROP TABLE IF EXISTS "Location" CASCADE;
-- DROP TABLE IF EXISTS "Admin" CASCADE;

-- ============================================================================
-- TABLE: Article
-- Purpose: Stores all health articles (diseases, procedures, patient stories)
-- ============================================================================

CREATE TABLE "Article" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "imageUrl" VARCHAR(500),
    "author" VARCHAR(100) NOT NULL DEFAULT 'Admin',
    "category" VARCHAR(50) NOT NULL DEFAULT 'umum',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Article Indexes
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
CREATE INDEX "Article_category_idx" ON "Article"("category");
CREATE INDEX "Article_published_idx" ON "Article"("published");
CREATE INDEX "Article_createdAt_idx" ON "Article"("createdAt" DESC);
CREATE INDEX "Article_author_idx" ON "Article"("author");

-- Article Comments
COMMENT ON TABLE "Article" IS 'Stores health articles including diseases, medical procedures, patient stories, and partnership articles';
COMMENT ON COLUMN "Article"."id" IS 'Primary key - UUID';
COMMENT ON COLUMN "Article"."slug" IS 'URL-friendly unique identifier';
COMMENT ON COLUMN "Article"."category" IS 'Categories: penyakit, tindakan-medis, kisah-pasien, partnership';
COMMENT ON COLUMN "Article"."published" IS 'Publication status - only published articles shown on frontend';

-- ============================================================================
-- TABLE: CompanyProfile
-- Purpose: Stores company information (usually 1 record only)
-- ============================================================================

CREATE TABLE "CompanyProfile" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "email" VARCHAR(100),
    "phone" VARCHAR(50),
    "address" TEXT,
    "logoUrl" VARCHAR(500),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CompanyProfile Comments
COMMENT ON TABLE "CompanyProfile" IS 'Company profile information - typically contains only 1 record';
COMMENT ON COLUMN "CompanyProfile"."description" IS 'Company description shown on about page and footer';

-- ============================================================================
-- TABLE: Location
-- Purpose: Stores branch/clinic locations
-- ============================================================================

CREATE TABLE "Location" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(50),
    "mapUrl" VARCHAR(500),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Location Indexes
CREATE INDEX "Location_city_idx" ON "Location"("city");
CREATE INDEX "Location_name_city_idx" ON "Location"("name", "city");

-- Location Comments
COMMENT ON TABLE "Location" IS 'Branch and clinic locations across Indonesia';
COMMENT ON COLUMN "Location"."mapUrl" IS 'Google Maps URL for location';

-- ============================================================================
-- TABLE: Admin
-- Purpose: Stores admin users for system management
-- ============================================================================

CREATE TABLE "Admin" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "username" VARCHAR(50) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100),
    "name" VARCHAR(100),
    "role" VARCHAR(20) NOT NULL DEFAULT 'admin',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Admin Indexes
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
CREATE INDEX "Admin_role_idx" ON "Admin"("role");
CREATE INDEX "Admin_isActive_idx" ON "Admin"("isActive");

-- Admin Comments
COMMENT ON TABLE "Admin" IS 'Admin users for content management system';
COMMENT ON COLUMN "Admin"."password" IS 'Hashed password using bcrypt (10 rounds)';
COMMENT ON COLUMN "Admin"."role" IS 'Roles: superadmin (full access), admin (content management), editor (article editing)';

-- ============================================================================
-- TRIGGERS: Auto-update updatedAt timestamp
-- ============================================================================

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
CREATE TRIGGER update_article_updated_at BEFORE UPDATE ON "Article"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_profile_updated_at BEFORE UPDATE ON "CompanyProfile"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_location_updated_at BEFORE UPDATE ON "Location"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON "Admin"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SAMPLE QUERIES
-- ============================================================================

-- Get all published articles by category
SELECT * FROM "Article" 
WHERE "published" = true AND "category" = 'penyakit'
ORDER BY "createdAt" DESC;

-- Get article count by category
SELECT "category", COUNT(*) as count
FROM "Article"
GROUP BY "category";

-- Get all locations by city
SELECT * FROM "Location"
WHERE "city" = 'Jakarta Selatan'
ORDER BY "name";

-- Get active admins by role
SELECT "username", "name", "role", "email"
FROM "Admin"
WHERE "isActive" = true
ORDER BY "role", "name";

-- Search articles by title or content
SELECT "id", "title", "slug", "category", "createdAt"
FROM "Article"
WHERE "published" = true 
  AND ("title" ILIKE '%diabetes%' OR "content" ILIKE '%diabetes%')
ORDER BY "createdAt" DESC;

-- Get latest articles with pagination
SELECT "id", "title", "slug", "excerpt", "category", "imageUrl", "createdAt"
FROM "Article"
WHERE "published" = true
ORDER BY "createdAt" DESC
LIMIT 10 OFFSET 0;

-- ============================================================================
-- USEFUL ADMIN QUERIES
-- ============================================================================

-- Count articles by status
SELECT 
    "category",
    COUNT(CASE WHEN "published" = true THEN 1 END) as published,
    COUNT(CASE WHEN "published" = false THEN 1 END) as draft,
    COUNT(*) as total
FROM "Article"
GROUP BY "category";

-- Get recently updated articles
SELECT "title", "slug", "category", "updatedAt", "published"
FROM "Article"
ORDER BY "updatedAt" DESC
LIMIT 20;

-- Find articles without images
SELECT "id", "title", "slug", "category"
FROM "Article"
WHERE "imageUrl" IS NULL OR "imageUrl" = '';

-- Get articles by specific author
SELECT "title", "category", "published", "createdAt"
FROM "Article"
WHERE "author" = 'Admin'
ORDER BY "createdAt" DESC;

-- ============================================================================
-- MAINTENANCE QUERIES
-- ============================================================================

-- Vacuum and analyze tables (for performance)
VACUUM ANALYZE "Article";
VACUUM ANALYZE "Location";
VACUUM ANALYZE "Admin";
VACUUM ANALYZE "CompanyProfile";

-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check index usage
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- ============================================================================
-- BACKUP & RESTORE COMMANDS (Run in terminal, not in SQL)
-- ============================================================================

-- Backup entire database
-- pg_dump -U postgres -d raho_db > backup_$(date +%Y%m%d_%H%M%S).sql

-- Backup specific tables
-- pg_dump -U postgres -d raho_db -t Article -t Location > backup_content.sql

-- Restore database
-- psql -U postgres -d raho_db < backup_20260615_120000.sql

-- ============================================================================
-- SECURITY NOTES
-- ============================================================================

-- 1. Always use parameterized queries to prevent SQL injection
-- 2. Admin passwords are hashed with bcrypt (10 rounds)
-- 3. Use environment variables for database credentials
-- 4. Implement row-level security (RLS) if needed
-- 5. Regular backups recommended (daily for production)

-- ============================================================================
-- VERSION HISTORY
-- ============================================================================

-- Version 1.0 - June 2026
-- - Initial schema with Article, CompanyProfile, Location, Admin
-- - No foreign key relationships (independent entities)
-- - UUID primary keys for all tables
-- - Auto-updating timestamps

-- ============================================================================
-- END OF SQL REFERENCE
-- ============================================================================
