# 📊 Database Documentation

All database and ERD documentation has been moved to the **[ERD](./ERD/)** folder.

## 📁 Quick Links

### Main Documentation
- **[Start Here - ERD/README.md](./ERD/README.md)** - Overview and navigation
- **[Quick Reference](./ERD/ERD_QUICK_REFERENCE.md)** - Cheat sheet
- **[Full Documentation](./ERD/DATABASE_DOCUMENTATION_README.md)** - Complete guide

### Visual Diagrams
- **[Interactive (dbdiagram.io)](./ERD/DATABASE_SCHEMA.dbml)** - Copy to dbdiagram.io
- **[Mermaid Diagram](./ERD/DATABASE_ERD.md)** - Works on GitHub
- **[ASCII Art](./ERD/ERD_VISUAL.txt)** - Terminal view

### SQL & Queries
- **[SQL Reference](./ERD/DATABASE_SQL_REFERENCE.sql)** - Queries and schemas

---

## 🗄️ Database Overview

**4 Main Entities**: Article, CompanyProfile, Location, Admin

**Tech Stack**:
- Database: PostgreSQL
- ORM: Prisma 5.x
- ID Type: UUID v4

---

## 🚀 Quick Commands

```bash
# View documentation
cat ERD/README.md

# Browse database
cd backend && npx prisma studio

# Seed database
cd backend && npm run seed
```

---

**📂 Full Documentation**: [ERD Folder](./ERD/)
