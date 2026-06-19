# Seeding Update - Non-Destructive Approach

## ✅ Perubahan yang Dilakukan

Sistem seeding telah diperbarui untuk **tidak menghapus data yang sudah ada** dalam database. Sekarang menggunakan strategi **upsert** (update or insert) yang lebih aman.

## 📋 Detail Perubahan

### 1. **Articles Seeding** (`seedArticles()`)
**Sebelumnya:**
- Menghapus semua artikel dengan `deleteMany()`
- Membuat artikel baru dengan `create()`

**Sekarang:**
- Menggunakan `upsert()` untuk setiap artikel
- Jika artikel dengan slug yang sama sudah ada → **UPDATE**
- Jika artikel belum ada → **CREATE**
- **Mempertahankan imageUrl yang sudah ada** (tidak upload ulang)
- Menampilkan counter: berapa artikel yang dibuat vs diupdate

### 2. **Locations Seeding** (`seedLocations()`)
**Sebelumnya:**
- Menghapus semua lokasi dengan `deleteMany()`
- Membuat lokasi baru dengan `create()`

**Sekarang:**
- Mencari lokasi berdasarkan kombinasi `name` dan `city`
- Jika lokasi sudah ada → **UPDATE**
- Jika lokasi belum ada → **CREATE**
- Menampilkan counter: berapa lokasi yang dibuat vs diupdate

### 3. **Admins Seeding** (`seedAdmins()`)
**Sebelumnya:**
- Menghapus semua admin dengan `deleteMany()`
- Membuat admin baru dengan password ter-hash

**Sekarang:**
- Mencari admin berdasarkan `username`
- Jika admin sudah ada → **UPDATE data (email, name, role)** tapi **TIDAK mengubah password**
- Jika admin belum ada → **CREATE** dengan password ter-hash
- Menampilkan counter: berapa admin yang dibuat vs diupdate

### 4. **Partnerships Seeding** (`seedPartnerships()`)
✅ Sudah menggunakan `upsert()` dari awal (tidak perlu perubahan)

### 5. **Company Profile**
✅ Sudah memeriksa keberadaan sebelum create (tidak perlu perubahan)

## 🎯 Manfaat Perubahan

1. **Data Aman**: Data yang sudah ada tidak akan hilang
2. **Image URL Preserved**: Gambar yang sudah diupload tidak diupload ulang
3. **Password Aman**: Password admin yang sudah ada tidak berubah
4. **Idempotent**: Bisa dijalankan berkali-kali dengan aman
5. **Informative**: Menampilkan informasi yang jelas tentang data yang dibuat vs diupdate

## 📊 Output Log Baru

```
Seeding articles...
✓ Updated article: Kolesterol Tinggi: Penyebab dan Cara Mengatasinya
✓ Created article: Diabetes: Manajemen Gula Darah
✓ Articles processed: 3 created, 2 updated

Seeding locations...
✓ Updated location: Attya Reverse Aging - Jakarta Selatan
✓ Created location: Raho Club Premier - Surabaya
✓ Locations processed: 2 created, 5 updated

Seeding admin users...
✓ Updated admin: admin (admin) - password unchanged
✓ Created admin: editor (editor)
✓ Admins processed: 1 created, 2 updated
```

## 🚀 Cara Menggunakan

```bash
# Jalankan seeding dengan aman (tidak akan menghapus data)
cd backend
npm run seed

# Atau menggunakan npx
npx ts-node prisma/seed.ts
```

## ⚠️ Catatan Penting

1. **Slug adalah Unique Identifier**: Artikel diidentifikasi berdasarkan slug
2. **Username adalah Unique Identifier**: Admin diidentifikasi berdasarkan username
3. **Name + City adalah Identifier**: Lokasi diidentifikasi berdasarkan kombinasi name dan city
4. **Password Admin**: Saat update, password admin **TIDAK diubah** untuk keamanan
5. **Image URL**: Jika artikel sudah memiliki imageUrl, tidak akan diupload ulang

## 🔄 Reset Database (Jika Diperlukan)

Jika Anda ingin reset database sepenuhnya:

```bash
cd backend

# Reset database (HATI-HATI: Ini akan menghapus semua data!)
npx prisma migrate reset

# Atau manual
npx prisma db push --force-reset
npm run seed
```

## 📝 File yang Dimodifikasi

- ✅ `backend/prisma/seed.ts` - Main seeding logic
- ✅ `backend/prisma/seeds/partnerships.ts` - Sudah menggunakan upsert (tidak diubah)
- ✅ Output logging yang lebih informatif

## 🎉 Kesimpulan

Seeding sekarang lebih aman dan dapat dijalankan kapan saja tanpa khawatir kehilangan data yang sudah ada!
