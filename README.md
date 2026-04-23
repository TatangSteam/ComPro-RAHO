# Company Profile Project

Project company profile dengan Next.js (frontend), Express + Prisma (backend), dan MinIO untuk storage gambar.

## Setup

### 1. Start Database (PostgreSQL)

```bash
docker-compose up -d
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Server akan berjalan di http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di http://localhost:3000

### MinIO (Sudah Running)

MinIO sudah berjalan di localhost:9000 dengan credentials:
- Access Key: raho_minio_user
- Secret Key: raho_minio_secret
- Bucket: raho-uploads

## API Endpoints

### Articles
- GET /api/articles - Get all articles
- GET /api/articles/:slug - Get article by slug
- POST /api/articles - Create article (with image upload)
- PUT /api/articles/:id - Update article
- DELETE /api/articles/:id - Delete article

### Company Profile
- GET /api/company - Get company profile
- POST /api/company - Create company profile (with logo upload)
- PUT /api/company/:id - Update company profile

## Features

- ✅ Company profile management
- ✅ Article CRUD operations
- ✅ Image upload to MinIO
- ✅ Responsive design
- ✅ Article slug-based routing
