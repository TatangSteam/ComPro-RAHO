# Database Seeding

## Cara Menjalankan Seeding

1. Pastikan database sudah di-migrate:
```bash
npm run prisma:migrate
```

2. Pastikan MinIO sudah running dan bucket sudah dibuat

3. Jalankan seeding:
```bash
npm run seed
```

## Data yang Di-seed

### Artikel Penyakit (5 artikel)
- Kolesterol Tinggi
- Stroke
- Kanker
- Diabetes
- Penyakit Jantung

### Artikel Tindakan Medis (3 artikel)
- Terapi Nano Bubble
- Terapi Gasotransmitter
- Microcirculation Optimization Model

### Artikel Kisah Pasien (4 artikel)
- Juwita Tri Yanti (Kanker Tiroid)
- Budi Santoso (Stroke)
- Siti Nurhaliza (Diabetes)
- Ahmad Hidayat (Kolesterol Tinggi)

### Company Profile
- RAHO Club Premier dengan informasi lengkap

## Gambar
Semua artikel akan menggunakan logo RAHO yang di-upload ke MinIO.
Path logo: `frontend/assets/LOGORAHO.png`

## Catatan
- Seeding akan menghapus semua artikel yang ada sebelumnya
- Company profile hanya dibuat jika belum ada
- Gambar akan di-upload ke MinIO dengan nama unik (timestamp + slug)
