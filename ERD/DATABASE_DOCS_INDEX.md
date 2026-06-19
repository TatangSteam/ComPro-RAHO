# 📚 Database Documentation Index

Panduan lengkap untuk mengakses dokumentasi database RAHO Club Premier.

## 🗂️ File Dokumentasi

### 🚀 Start Here

| File | Type | Best For | Size |
|------|------|----------|------|
| **[ERD_QUICK_REFERENCE.md](./ERD_QUICK_REFERENCE.md)** | Quick Guide | Quick lookup, cheat sheet | Small |
| **[DATABASE_DOCUMENTATION_README.md](./DATABASE_DOCUMENTATION_README.md)** | Full Guide | Complete understanding | Large |

---

### 📊 ERD Visualizations

| File | Format | Tool | Interactive |
|------|--------|------|-------------|
| **[DATABASE_ERD.md](./DATABASE_ERD.md)** | Mermaid | GitHub/GitLab, mermaid.live | ✅ |
| **[ERD_VISUAL.txt](./ERD_VISUAL.txt)** | ASCII Art | Text Editor, Terminal | ❌ |
| **[DATABASE_SCHEMA.dbml](./DATABASE_SCHEMA.dbml)** | DBML | dbdiagram.io | ✅ |

---

### 💾 SQL Reference

| File | Purpose | Executable |
|------|---------|-----------|
| **[DATABASE_SQL_REFERENCE.sql](./DATABASE_SQL_REFERENCE.sql)** | SQL queries, schemas, samples | ✅ |

---

## 🎯 Use Cases

### "I want to quickly see the database structure"
→ Read **[ERD_QUICK_REFERENCE.md](./ERD_QUICK_REFERENCE.md)**

### "I need a visual diagram"
→ Open **[DATABASE_SCHEMA.dbml](./DATABASE_SCHEMA.dbml)** in https://dbdiagram.io/

### "I need to understand each entity in detail"
→ Read **[DATABASE_ERD.md](./DATABASE_ERD.md)**

### "I need SQL queries for common operations"
→ Read **[DATABASE_SQL_REFERENCE.sql](./DATABASE_SQL_REFERENCE.sql)**

### "I need complete documentation"
→ Read **[DATABASE_DOCUMENTATION_README.md](./DATABASE_DOCUMENTATION_README.md)**

### "I'm in terminal and need quick view"
→ Run: `cat ERD_VISUAL.txt`

---

## 📖 Reading Order

### For New Developers
1. **ERD_QUICK_REFERENCE.md** - Overview
2. **DATABASE_SCHEMA.dbml** - Visual (dbdiagram.io)
3. **DATABASE_ERD.md** - Detailed entities
4. **DATABASE_SQL_REFERENCE.sql** - SQL examples

### For Database Admins
1. **DATABASE_DOCUMENTATION_README.md** - Full guide
2. **DATABASE_SQL_REFERENCE.sql** - SQL reference
3. **ERD_QUICK_REFERENCE.md** - Quick commands

### For Frontend Developers
1. **ERD_QUICK_REFERENCE.md** - Entity overview
2. **DATABASE_ERD.md** - Entity details
3. Check: `backend/prisma/schema.prisma`

---

## 🛠️ Tools & Links

### Visualization Tools

#### 1. dbdiagram.io (Recommended)
```
URL: https://dbdiagram.io/
File: DATABASE_SCHEMA.dbml
Steps:
1. Open dbdiagram.io
2. Click "Go to App"
3. Copy-paste DATABASE_SCHEMA.dbml content
4. Export to PNG/PDF if needed
```

#### 2. Mermaid Live Editor
```
URL: https://mermaid.live/
File: DATABASE_ERD.md (copy Mermaid diagram)
Steps:
1. Open mermaid.live
2. Copy mermaid diagram from DATABASE_ERD.md
3. Paste in editor
4. Export as needed
```

#### 3. Prisma Studio (Interactive)
```
Command: npx prisma studio
Description: Browse and edit data
URL: http://localhost:5555
```

#### 4. DBeaver / pgAdmin
```
Type: Desktop Application
Purpose: Full database management
Download:
- DBeaver: https://dbeaver.io/
- pgAdmin: https://www.pgadmin.org/
```

---

## 📊 Database Summary

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃              RAHO CLUB PREMIER DATABASE                      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ Database:    PostgreSQL                                      ┃
┃ ORM:         Prisma 5.x                                      ┃
┃ Tables:      4 (Article, CompanyProfile, Location, Admin)   ┃
┃ Relationships: None (independent entities)                   ┃
┃ ID Type:     UUID v4                                         ┃
┃ Timestamps:  Auto-managed (createdAt, updatedAt)            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Entities Overview

| Entity | Purpose | Typical Size | Growth Rate |
|--------|---------|--------------|-------------|
| **Article** | Health content | 50-200 records | Medium |
| **CompanyProfile** | Company info | 1 record | Static |
| **Location** | Branches | 5-20 records | Low |
| **Admin** | System users | 3-10 records | Very Low |

---

## 🚀 Quick Start Commands

```bash
# 1. View database interactively
npx prisma studio

# 2. View schema in terminal
cat backend/prisma/schema.prisma

# 3. View ERD in terminal
cat ERD_VISUAL.txt

# 4. Connect to database
psql -U postgres -d raho_db

# 5. Backup database
pg_dump -U postgres -d raho_db > backup.sql

# 6. Run migrations
npx prisma migrate dev

# 7. Seed database
cd backend && npm run seed
```

---

## 📝 File Descriptions

### 1. ERD_QUICK_REFERENCE.md
**Size**: ~3 KB | **Time to read**: 2-3 minutes

Quick reference dengan:
- Entity summary table
- Common queries
- Default credentials
- Quick commands

**Best for**: Daily reference, quick lookup

---

### 2. DATABASE_ERD.md
**Size**: ~15 KB | **Time to read**: 10-15 minutes

Comprehensive ERD dengan:
- Mermaid diagram
- Detailed entity descriptions
- Field specifications
- Future enhancements
- Security notes

**Best for**: Understanding database design

---

### 3. ERD_VISUAL.txt
**Size**: ~8 KB | **Time to read**: 5 minutes

ASCII art diagram dengan:
- Visual entity boxes
- Data flow diagram
- Entity statistics
- Legend

**Best for**: Terminal viewing, quick visual reference

---

### 4. DATABASE_SCHEMA.dbml
**Size**: ~5 KB | **Format**: DBML

DBML schema untuk visualisasi:
- Interactive diagram
- Export to PNG/PDF/SQL
- Professional presentation

**Best for**: Visual presentations, sharing with team

---

### 5. DATABASE_SQL_REFERENCE.sql
**Size**: ~10 KB | **Format**: SQL

Complete SQL reference:
- CREATE TABLE statements
- Indexes and triggers
- Sample queries
- Maintenance commands
- Backup/restore

**Best for**: Database implementation, queries

---

### 6. DATABASE_DOCUMENTATION_README.md
**Size**: ~20 KB | **Time to read**: 20-30 minutes

Complete guide dengan:
- All documentation links
- Detailed entity descriptions
- Tools and visualization guides
- Maintenance procedures
- Future enhancements
- Troubleshooting

**Best for**: Complete understanding, reference manual

---

## 🔍 Search Guide

### Looking for specific information?

| Topic | File | Section |
|-------|------|---------|
| Entity fields | DATABASE_ERD.md | Detailed Entity Descriptions |
| SQL queries | DATABASE_SQL_REFERENCE.sql | SAMPLE QUERIES |
| Indexes | DATABASE_SQL_REFERENCE.sql | Indexes section |
| Security | DATABASE_ERD.md | Security Notes |
| Backup | DATABASE_SQL_REFERENCE.sql | BACKUP & RESTORE |
| Visualization | DATABASE_DOCUMENTATION_README.md | Visualization Tools |
| Quick commands | ERD_QUICK_REFERENCE.md | Quick Commands |
| Default accounts | ERD_QUICK_REFERENCE.md | Admin Entity |

---

## 📞 Support & Updates

### Getting Help
1. Check this index for relevant documentation
2. Read the specific documentation file
3. Check Prisma schema: `backend/prisma/schema.prisma`
4. Run Prisma Studio for data inspection

### Updating Documentation
When database changes:
1. Update `backend/prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update all ERD documentation files
4. Regenerate diagrams in dbdiagram.io

---

## 📅 Version Information

| Item | Version | Date |
|------|---------|------|
| Database Schema | 1.0 | June 15, 2026 |
| PostgreSQL | 14+ | - |
| Prisma | 5.x | - |
| Documentation | 1.0 | June 15, 2026 |

---

## ✅ Documentation Checklist

Before deployment, ensure:
- [ ] All ERD files are up to date
- [ ] Prisma schema matches documentation
- [ ] SQL reference includes all indexes
- [ ] Default credentials documented
- [ ] Backup procedures documented
- [ ] Visual diagrams exported and saved

---

## 🎓 Learning Path

### Beginner
1. Read ERD_QUICK_REFERENCE.md
2. Open DATABASE_SCHEMA.dbml in dbdiagram.io
3. Run `npx prisma studio` to explore data

### Intermediate
1. Read DATABASE_ERD.md thoroughly
2. Practice queries from DATABASE_SQL_REFERENCE.sql
3. Understand relationships and indexes

### Advanced
1. Read DATABASE_DOCUMENTATION_README.md completely
2. Plan future enhancements
3. Optimize queries and indexes
4. Set up backup automation

---

**Last Updated**: June 15, 2026  
**Maintained by**: Development Team  
**Documentation Version**: 1.0
