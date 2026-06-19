# 📊 ERD & Database Documentation

Dokumentasi lengkap Entity Relational Diagram dan database untuk RAHO Club Premier.

---

## 📁 Files in This Folder

| # | File | Size | Description |
|---|------|------|-------------|
| 1 | **[DATABASE_DOCS_INDEX.md](./DATABASE_DOCS_INDEX.md)** | 8.74 KB | 📚 **START HERE** - Navigation hub |
| 2 | **[ERD_QUICK_REFERENCE.md](./ERD_QUICK_REFERENCE.md)** | 4.52 KB | 🚀 Quick reference & cheat sheet |
| 3 | **[DATABASE_ERD.md](./DATABASE_ERD.md)** | 7.84 KB | 📊 Mermaid ERD diagram |
| 4 | **[DATABASE_SCHEMA.dbml](./DATABASE_SCHEMA.dbml)** | 4.28 KB | 🎨 DBML for dbdiagram.io |
| 5 | **[ERD_VISUAL.txt](./ERD_VISUAL.txt)** | 17.39 KB | 🎨 ASCII art diagram |
| 6 | **[DATABASE_SQL_REFERENCE.sql](./DATABASE_SQL_REFERENCE.sql)** | 10.29 KB | 💾 SQL queries & reference |
| 7 | **[DATABASE_DOCUMENTATION_README.md](./DATABASE_DOCUMENTATION_README.md)** | 8.95 KB | 📖 Complete guide |
| 8 | **[ERD_DOCUMENTATION_SUMMARY.md](./ERD_DOCUMENTATION_SUMMARY.md)** | 11.54 KB | 📊 Documentation summary |
| 9 | **[SEEDING_UPDATE.md](./SEEDING_UPDATE.md)** | 3.91 KB | 🔄 Seeding documentation |

**Total**: 9 files | ~77 KB

---

## 🚀 Quick Start

### New to the project?
1. Read **[DATABASE_DOCS_INDEX.md](./DATABASE_DOCS_INDEX.md)** first
2. Then **[ERD_QUICK_REFERENCE.md](./ERD_QUICK_REFERENCE.md)** for overview

### Need a visual diagram?
- **Interactive**: Open **[DATABASE_SCHEMA.dbml](./DATABASE_SCHEMA.dbml)** in https://dbdiagram.io/
- **GitHub**: View **[DATABASE_ERD.md](./DATABASE_ERD.md)** (Mermaid)
- **Terminal**: `cat ERD_VISUAL.txt`

### Looking for SQL queries?
- Read **[DATABASE_SQL_REFERENCE.sql](./DATABASE_SQL_REFERENCE.sql)**

### Complete documentation?
- Read **[DATABASE_DOCUMENTATION_README.md](./DATABASE_DOCUMENTATION_README.md)**

---

## 🗄️ Database Overview

### 4 Main Entities

```
┌─────────────────────────────────────────────┐
│  Article          (50-200 records)          │
│  CompanyProfile   (1 record)                │
│  Location         (5-20 records)            │
│  Admin            (3-10 records)            │
└─────────────────────────────────────────────┘
```

**Database**: PostgreSQL  
**ORM**: Prisma 5.x  
**ID Type**: UUID v4  
**Relationships**: Independent entities (no FK)

---

## 🎯 Use Cases

| I want to... | Read this file |
|--------------|----------------|
| Get a quick overview | [ERD_QUICK_REFERENCE.md](./ERD_QUICK_REFERENCE.md) |
| See visual diagram | [DATABASE_SCHEMA.dbml](./DATABASE_SCHEMA.dbml) → dbdiagram.io |
| Understand entities | [DATABASE_ERD.md](./DATABASE_ERD.md) |
| Find SQL queries | [DATABASE_SQL_REFERENCE.sql](./DATABASE_SQL_REFERENCE.sql) |
| Read full documentation | [DATABASE_DOCUMENTATION_README.md](./DATABASE_DOCUMENTATION_README.md) |
| Navigate all docs | [DATABASE_DOCS_INDEX.md](./DATABASE_DOCS_INDEX.md) |
| See summary | [ERD_DOCUMENTATION_SUMMARY.md](./ERD_DOCUMENTATION_SUMMARY.md) |
| View in terminal | [ERD_VISUAL.txt](./ERD_VISUAL.txt) |
| Understand seeding | [SEEDING_UPDATE.md](./SEEDING_UPDATE.md) |

---

## 💻 Quick Commands

```bash
# View ERD in terminal
cat ERD/ERD_VISUAL.txt

# Browse database interactively
cd backend && npx prisma studio

# View schema
cat backend/prisma/schema.prisma

# Seed database (non-destructive)
cd backend && npm run seed
```

---

## 📊 Visualization Options

### 1. dbdiagram.io (Recommended) ⭐
```
1. Open: https://dbdiagram.io/
2. Copy: DATABASE_SCHEMA.dbml
3. Paste in editor
4. Export to PNG/PDF
```

### 2. Mermaid (GitHub)
```
1. View: DATABASE_ERD.md on GitHub
2. Or copy to: https://mermaid.live/
```

### 3. ASCII Art (Terminal)
```bash
cat ERD/ERD_VISUAL.txt
```

### 4. Prisma Studio (Interactive)
```bash
cd backend
npx prisma studio
# Opens http://localhost:5555
```

---

## 🔐 Default Admin Accounts

```
Username: admin        | Password: admin123      | Role: admin
Username: superadmin   | Password: super123      | Role: superadmin
Username: editor       | Password: editor123     | Role: editor
```

---

## 📋 Common Queries

### Get Published Articles
```sql
SELECT * FROM "Article" 
WHERE "published" = true 
ORDER BY "createdAt" DESC LIMIT 10;
```

### Get Locations by City
```sql
SELECT * FROM "Location" 
WHERE "city" ILIKE '%jakarta%';
```

### Get Active Admins
```sql
SELECT * FROM "Admin" 
WHERE "isActive" = true;
```

More queries in: **[DATABASE_SQL_REFERENCE.sql](./DATABASE_SQL_REFERENCE.sql)**

---

## 🛠️ Maintenance

### Backup
```bash
pg_dump -U postgres -d raho_db > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
psql -U postgres -d raho_db < backup.sql
```

### Migrate
```bash
cd backend
npx prisma migrate dev
```

### Seed (Safe - Non-Destructive)
```bash
cd backend
npm run seed
```

Read more: **[SEEDING_UPDATE.md](./SEEDING_UPDATE.md)**

---

## 📞 Getting Help

1. Start with: **[DATABASE_DOCS_INDEX.md](./DATABASE_DOCS_INDEX.md)**
2. Quick lookup: **[ERD_QUICK_REFERENCE.md](./ERD_QUICK_REFERENCE.md)**
3. Full guide: **[DATABASE_DOCUMENTATION_README.md](./DATABASE_DOCUMENTATION_README.md)**
4. SQL reference: **[DATABASE_SQL_REFERENCE.sql](./DATABASE_SQL_REFERENCE.sql)**

---

## 📈 Documentation Statistics

- **Total Files**: 9
- **Total Size**: ~77 KB
- **Entities**: 4 tables
- **Fields**: 36 total
- **Sample Queries**: 50+
- **Diagrams**: 3 formats
- **Coverage**: 100%

---

## ✅ Version

- **Database Schema**: 1.0
- **Documentation**: 1.0
- **Last Updated**: June 15, 2026
- **PostgreSQL**: 14+
- **Prisma**: 5.x

---

**📚 Start Reading**: [DATABASE_DOCS_INDEX.md](./DATABASE_DOCS_INDEX.md)
