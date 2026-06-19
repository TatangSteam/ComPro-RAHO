# 📊 Database Documentation - RAHO Club Premier

Dokumentasi lengkap tentang struktur database untuk sistem RAHO Club Premier.

## 📁 File Dokumentasi

### 1. **DATABASE_ERD.md** 
📘 **Dokumentasi Utama ERD**

File ini berisi:
- Entity Relational Diagram dalam format Mermaid
- Deskripsi detail setiap entity
- Penjelasan field dan constraints
- Relasi antar entity (saat ini tidak ada FK)
- Rekomendasi index untuk performa
- Statistik database
- Future enhancements (optional)

**Cara Menggunakan:**
- Buka di GitHub/GitLab untuk melihat diagram Mermaid secara otomatis
- Atau gunakan Mermaid Live Editor: https://mermaid.live/
- Copy diagram Mermaid dan paste ke editor

---

### 2. **ERD_VISUAL.txt**
🎨 **Diagram ASCII Visual**

File ini berisi:
- ERD dalam format ASCII art
- Mudah dibaca di text editor atau terminal
- Data flow diagram
- Entity statistics
- Legend dan notasi

**Cara Menggunakan:**
```bash
cat ERD_VISUAL.txt
# atau
less ERD_VISUAL.txt
```

---

### 3. **DATABASE_SCHEMA.dbml**
🔧 **DBML Schema untuk dbdiagram.io**

File ini berisi:
- Schema dalam format DBML (Database Markup Language)
- Dapat divisualisasikan di dbdiagram.io
- Interactive diagram dengan zoom dan export

**Cara Menggunakan:**
1. Buka https://dbdiagram.io/
2. Klik "Go to App"
3. Copy seluruh isi file `DATABASE_SCHEMA.dbml`
4. Paste di editor dbdiagram.io
5. Klik "Export" untuk download gambar ERD

**Fitur dbdiagram.io:**
- Interactive zoom dan pan
- Export ke PNG, PDF, SQL
- Share diagram dengan link
- Auto-layout diagram

---

### 4. **DATABASE_SQL_REFERENCE.sql**
💾 **SQL Reference & Queries**

File ini berisi:
- CREATE TABLE statements lengkap
- Indexes dan constraints
- Triggers untuk auto-update timestamps
- Sample queries untuk CRUD operations
- Admin dan maintenance queries
- Backup & restore commands
- Security notes

**Cara Menggunakan:**
```bash
# Run dalam PostgreSQL
psql -U postgres -d raho_db -f DATABASE_SQL_REFERENCE.sql

# Atau copy-paste query yang dibutuhkan ke SQL client
```

---

## 🗄️ Database Overview

### Entities
| Entity | Purpose | Records |
|--------|---------|---------|
| **Article** | Health articles (diseases, procedures, stories) | 50-200 |
| **CompanyProfile** | Company information | 1 |
| **Location** | Branch/clinic locations | 5-20 |
| **Admin** | System administrators | 3-10 |

### Technology Stack
- **Database**: PostgreSQL
- **ORM**: Prisma 5.x
- **ID Type**: UUID v4
- **Authentication**: bcrypt password hashing

---

## 🚀 Quick Start

### View Database Schema
```bash
# Using Prisma Studio (Interactive GUI)
cd backend
npx prisma studio

# Opens at http://localhost:5555
```

### Generate ERD from Prisma
```bash
# Install ERD generator (optional)
npm install -D prisma-erd-generator @mermaid-js/mermaid-cli

# Add to schema.prisma:
# generator erd {
#   provider = "prisma-erd-generator"
# }

# Generate ERD
npx prisma generate
```

### Database Migrations
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (CAUTION!)
npx prisma migrate reset
```

### Seed Database
```bash
cd backend
npm run seed

# atau
npx ts-node prisma/seed.ts
```

---

## 📋 Entity Details

### 1. Article
**Purpose**: Stores all health articles and content

**Key Fields**:
- `slug` (unique) - URL identifier
- `category` - penyakit, tindakan-medis, kisah-pasien, partnership
- `published` - Publication status
- `imageUrl` - Article image

**Categories**:
- `penyakit` - Disease articles (Diabetes, Stroke, etc)
- `tindakan-medis` - Medical procedures (Nano Bubble, etc)
- `kisah-pasien` - Patient stories/testimonials
- `partnership` - Partnership articles

---

### 2. CompanyProfile
**Purpose**: Company information (singleton)

**Key Fields**:
- `name` - Company name
- `description` - Company description
- `logoUrl` - Company logo

**Note**: Usually only 1 record exists

---

### 3. Location
**Purpose**: Branch and clinic locations

**Key Fields**:
- `name` - Location name
- `city` - City name
- `mapUrl` - Google Maps link

**Examples**:
- Attya Reverse Aging - Jakarta Selatan
- Raho Club Premier - Bandung
- Apotek Hannah - Bali

---

### 4. Admin
**Purpose**: System administrators

**Key Fields**:
- `username` (unique) - Login username
- `password` - Hashed password (bcrypt)
- `role` - superadmin, admin, editor

**Roles**:
- `superadmin` - Full system access
- `admin` - Content management
- `editor` - Article editing only

**Default Accounts**:
```
admin / admin123
superadmin / super123
editor / editor123
```

---

## 🔐 Security

### Password Hashing
- Algorithm: bcrypt
- Rounds: 10
- Salt: Automatically generated per password

### UUID Usage
- All primary keys use UUID v4
- Prevents enumeration attacks
- Better distribution for sharding

### Unique Constraints
- `Article.slug` - Prevents duplicate URLs
- `Admin.username` - Prevents duplicate logins

---

## 📈 Performance

### Indexes
**Existing Unique Indexes**:
- `Article.slug`
- `Admin.username`

**Recommended Indexes**:
```sql
CREATE INDEX "Article_category_idx" ON "Article"("category");
CREATE INDEX "Article_published_idx" ON "Article"("published");
CREATE INDEX "Article_createdAt_idx" ON "Article"("createdAt" DESC);
CREATE INDEX "Location_city_idx" ON "Location"("city");
CREATE INDEX "Admin_role_idx" ON "Admin"("role");
```

### Query Optimization Tips
1. Always use indexes for WHERE clauses
2. Use LIMIT for pagination
3. Use EXPLAIN ANALYZE to check query plans
4. Regular VACUUM ANALYZE for statistics

---

## 🔄 Common Queries

### Get Published Articles
```sql
SELECT * FROM "Article" 
WHERE "published" = true 
ORDER BY "createdAt" DESC 
LIMIT 10;
```

### Get Articles by Category
```sql
SELECT * FROM "Article" 
WHERE "category" = 'penyakit' AND "published" = true
ORDER BY "createdAt" DESC;
```

### Search Articles
```sql
SELECT * FROM "Article" 
WHERE "published" = true 
  AND ("title" ILIKE '%diabetes%' OR "content" ILIKE '%diabetes%')
ORDER BY "createdAt" DESC;
```

### Get Locations by City
```sql
SELECT * FROM "Location" 
WHERE "city" ILIKE '%jakarta%'
ORDER BY "name";
```

---

## 🛠️ Maintenance

### Backup Database
```bash
# Full backup
pg_dump -U postgres -d raho_db > backup_$(date +%Y%m%d).sql

# Backup with compression
pg_dump -U postgres -d raho_db | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Restore Database
```bash
# Restore from backup
psql -U postgres -d raho_db < backup_20260615.sql

# Restore from compressed
gunzip < backup_20260615.sql.gz | psql -U postgres -d raho_db
```

### Check Database Size
```sql
SELECT pg_size_pretty(pg_database_size('raho_db'));
```

### Vacuum and Analyze
```sql
VACUUM ANALYZE "Article";
VACUUM ANALYZE "Location";
VACUUM ANALYZE "Admin";
```

---

## 📊 Visualization Tools

### 1. **dbdiagram.io** (Recommended)
- URL: https://dbdiagram.io/
- File: `DATABASE_SCHEMA.dbml`
- Features: Interactive, export to PNG/PDF

### 2. **Mermaid Live Editor**
- URL: https://mermaid.live/
- File: Copy diagram from `DATABASE_ERD.md`
- Features: GitHub integration, export

### 3. **Prisma Studio**
- Command: `npx prisma studio`
- Features: Interactive data browser, editing

### 4. **DBeaver / pgAdmin**
- Desktop applications
- Features: Full database management

---

## 🔮 Future Enhancements

Potential additions to consider:

### Comments System
```sql
CREATE TABLE "Comment" (
  id UUID PRIMARY KEY,
  articleId UUID REFERENCES "Article"(id),
  name VARCHAR(100),
  email VARCHAR(100),
  content TEXT,
  approved BOOLEAN DEFAULT false,
  createdAt TIMESTAMP
);
```

### Tags System
```sql
CREATE TABLE "Tag" (
  id UUID PRIMARY KEY,
  name VARCHAR(50),
  slug VARCHAR(50) UNIQUE
);

CREATE TABLE "ArticleTag" (
  articleId UUID REFERENCES "Article"(id),
  tagId UUID REFERENCES "Tag"(id),
  PRIMARY KEY (articleId, tagId)
);
```

### Audit Log
```sql
CREATE TABLE "AuditLog" (
  id UUID PRIMARY KEY,
  adminId UUID REFERENCES "Admin"(id),
  action VARCHAR(50),
  entity VARCHAR(50),
  entityId UUID,
  details JSONB,
  createdAt TIMESTAMP
);
```

---

## 📞 Support

Untuk pertanyaan atau masalah terkait database:

1. Cek dokumentasi di folder ini
2. Review Prisma schema: `backend/prisma/schema.prisma`
3. Jalankan Prisma Studio untuk inspect data
4. Check logs di `backend/logs/`

---

## 📝 Version History

**Version 1.0** - June 2026
- Initial schema design
- 4 main entities (Article, CompanyProfile, Location, Admin)
- UUID primary keys
- No foreign key relationships (by design)
- Auto-updating timestamps

---

## 📄 License

Dokumentasi database ini adalah bagian dari project RAHO Club Premier.

---

**Last Updated**: June 15, 2026
**Maintained by**: Development Team
**Database Version**: 1.0
