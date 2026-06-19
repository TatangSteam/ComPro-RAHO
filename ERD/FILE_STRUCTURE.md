# 📁 ERD Folder - File Structure

## 📊 Directory Tree

```
Root/
├── DATABASE_README.md ────────────► Quick link to this folder
│
└── ERD/ ──────────────────────────► Main documentation folder
    │
    ├── README.md ─────────────────► 🚀 START HERE - Overview & navigation
    │
    ├── DATABASE_DOCS_INDEX.md ────► 📚 Navigation hub for all docs
    │
    ├── ERD_QUICK_REFERENCE.md ────► ⚡ Quick reference & cheat sheet
    │
    ├── DATABASE_ERD.md ───────────► 📊 Mermaid ERD diagram
    │
    ├── DATABASE_SCHEMA.dbml ──────► 🎨 DBML for dbdiagram.io
    │
    ├── ERD_VISUAL.txt ────────────► 🖼️  ASCII art diagram
    │
    ├── DATABASE_SQL_REFERENCE.sql ► 💾 SQL queries & reference
    │
    ├── DATABASE_DOCUMENTATION_README.md ► 📖 Complete guide
    │
    ├── ERD_DOCUMENTATION_SUMMARY.md ──► 📊 Documentation summary
    │
    ├── SEEDING_UPDATE.md ─────────► 🔄 Seeding documentation
    │
    └── FILE_STRUCTURE.md ─────────► 📁 This file
```

---

## 📋 File Categories

### 🚀 Getting Started
- **README.md** - Start here for overview
- **ERD_QUICK_REFERENCE.md** - Quick lookup
- **DATABASE_DOCS_INDEX.md** - Navigation hub

### 📊 Visual Diagrams
- **DATABASE_SCHEMA.dbml** - Interactive (dbdiagram.io)
- **DATABASE_ERD.md** - Mermaid (GitHub)
- **ERD_VISUAL.txt** - ASCII art (terminal)

### 📖 Complete Documentation
- **DATABASE_DOCUMENTATION_README.md** - Full guide
- **ERD_DOCUMENTATION_SUMMARY.md** - Summary
- **DATABASE_SQL_REFERENCE.sql** - SQL reference

### 🔧 Technical Guides
- **SEEDING_UPDATE.md** - Database seeding
- **FILE_STRUCTURE.md** - This structure guide

---

## 📊 File Statistics

| File | Size | Lines | Purpose |
|------|------|-------|---------|
| README.md | 4.2 KB | ~150 | Overview & quick start |
| DATABASE_DOCS_INDEX.md | 8.7 KB | ~320 | Navigation hub |
| ERD_QUICK_REFERENCE.md | 4.5 KB | ~180 | Quick reference |
| DATABASE_ERD.md | 7.8 KB | ~280 | Mermaid diagram |
| DATABASE_SCHEMA.dbml | 4.3 KB | ~160 | DBML schema |
| ERD_VISUAL.txt | 17.4 KB | ~500 | ASCII diagram |
| DATABASE_SQL_REFERENCE.sql | 10.3 KB | ~400 | SQL queries |
| DATABASE_DOCUMENTATION_README.md | 9.0 KB | ~350 | Complete guide |
| ERD_DOCUMENTATION_SUMMARY.md | 11.5 KB | ~450 | Summary |
| SEEDING_UPDATE.md | 3.9 KB | ~140 | Seeding guide |
| FILE_STRUCTURE.md | 3.0 KB | ~120 | Structure guide |

**Total**: 11 files | ~85 KB | ~3,050 lines

---

## 🎯 Reading Paths

### For New Developers
```
1. README.md
2. ERD_QUICK_REFERENCE.md
3. DATABASE_SCHEMA.dbml → dbdiagram.io
4. DATABASE_ERD.md
```

### For Backend Developers
```
1. DATABASE_SQL_REFERENCE.sql
2. DATABASE_ERD.md
3. SEEDING_UPDATE.md
4. DATABASE_DOCUMENTATION_README.md
```

### For Database Admins
```
1. DATABASE_DOCUMENTATION_README.md
2. DATABASE_SQL_REFERENCE.sql
3. SEEDING_UPDATE.md
4. ERD_QUICK_REFERENCE.md
```

### For Project Managers
```
1. README.md
2. ERD_DOCUMENTATION_SUMMARY.md
3. DATABASE_SCHEMA.dbml → dbdiagram.io (export to PDF)
```

---

## 🔍 File Relationships

```
                    README.md
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
DATABASE_DOCS_    ERD_QUICK_      DATABASE_
  INDEX.md        REFERENCE.md    SCHEMA.dbml
        │               │               │
        └───────────────┼───────────────┘
                        │
                        ▼
              DATABASE_ERD.md
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
DATABASE_SQL_    DATABASE_         SEEDING_
REFERENCE.sql    DOCUMENTATION_    UPDATE.md
                 README.md
                        │
                        ▼
              ERD_DOCUMENTATION_
                 SUMMARY.md
```

---

## 🛠️ Access Patterns

### Read Documentation
```bash
# In terminal
cd ERD
cat README.md

# Quick reference
cat ERD_QUICK_REFERENCE.md

# Visual in terminal
cat ERD_VISUAL.txt
```

### View Diagrams
```bash
# Interactive (browser)
# 1. Open https://dbdiagram.io/
# 2. Copy DATABASE_SCHEMA.dbml
# 3. Paste and visualize

# GitHub (if committed)
# View DATABASE_ERD.md directly
```

### Execute SQL
```bash
# Connect to database
psql -U postgres -d raho_db

# Run specific query from file
psql -U postgres -d raho_db -f DATABASE_SQL_REFERENCE.sql
```

---

## 📦 Maintenance

### When Database Schema Changes
1. Update `backend/prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update all files in ERD folder:
   - DATABASE_ERD.md
   - DATABASE_SCHEMA.dbml
   - ERD_VISUAL.txt
   - DATABASE_SQL_REFERENCE.sql
   - Others as needed
4. Regenerate diagrams in dbdiagram.io
5. Update version numbers in files

### When Adding New Documentation
1. Add file to ERD folder
2. Update README.md with new file
3. Update DATABASE_DOCS_INDEX.md
4. Update this FILE_STRUCTURE.md
5. Update file relationships diagram

---

## 🔗 External Links

### Visualization Tools
- **dbdiagram.io**: https://dbdiagram.io/
- **Mermaid Live**: https://mermaid.live/
- **Prisma Studio**: `npx prisma studio`

### Documentation
- **Prisma Docs**: https://www.prisma.io/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/

---

## ✅ Checklist

### New Developer Setup
- [ ] Read README.md
- [ ] View DATABASE_SCHEMA.dbml in dbdiagram.io
- [ ] Run `npx prisma studio`
- [ ] Read ERD_QUICK_REFERENCE.md
- [ ] Bookmark DATABASE_DOCS_INDEX.md

### Before Deployment
- [ ] All files up to date with schema
- [ ] Diagrams regenerated
- [ ] SQL reference tested
- [ ] Version numbers updated
- [ ] File structure documented

---

**Last Updated**: June 15, 2026  
**Version**: 1.0  
**Maintained by**: Development Team
