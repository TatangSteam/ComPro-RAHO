# IMI Collaboration Section - Asset Requirements

## Required Images

Untuk IMI Collaboration Section, Anda perlu menambahkan 3 gambar berikut ke folder `frontend/public/assets/`:

### 1. IMI Logo (Colored Version)
- **Path:** `/assets/imi-logo.png`
- **Usage:** Ditampilkan di section atas dengan background cream/light
- **Recommended Size:** 800x400px (width x height)
- **Format:** PNG with transparent background
- **Description:** Logo IMI (Inovasi Molekuler Indonesia) dengan warna asli

### 2. Collaboration Background Image
- **Path:** `/assets/collaboration-bg.jpg`
- **Usage:** Background image untuk section CTA tengah
- **Recommended Size:** 1920x1080px atau lebih besar
- **Format:** JPG or PNG
- **Description:** Gambar yang menampilkan suasana kolaborasi, partnership, atau profesional working (seperti di design: orang sedang menulis/bekerja)
- **Note:** Image akan di-overlay dengan gradient gelap, jadi pilih gambar dengan subjek yang tetap visible dengan overlay

### 3. IMI Logo (White Version)
- **Path:** `/assets/imi-logo-white.png`
- **Usage:** Ditampilkan di footer section dengan background dark
- **Recommended Size:** 400x200px (width x height)
- **Format:** PNG with transparent background
- **Description:** Logo IMI dalam warna putih untuk kontras dengan background gelap

## Installation Instructions

1. Dapatkan logo IMI dari tim IMI atau desainer
2. Pilih/buat gambar background yang sesuai tema partnership
3. Simpan semua gambar dengan nama file yang sesuai di `frontend/public/assets/`
4. Pastikan dimensi gambar sesuai rekomendasi untuk performa optimal

## Temporary Placeholders

Jika gambar belum tersedia, Anda dapat menggunakan placeholder sementara:
- Untuk logo: Gunakan text "IMI Logo" dengan background
- Untuk background: Gunakan gambar existing dari folder assets atau stock photo

## Testing

Setelah menambahkan gambar, jalankan:
```bash
cd frontend
npm run dev
```

Kemudian buka `http://localhost:3000` dan scroll ke section IMI Collaboration untuk melihat hasilnya.

## Design Reference

Section ini memiliki 3 bagian:
1. **Top Section** - Background cream dengan dekorasi bubble, menampilkan IMI logo berwarna
2. **Middle Section** - Hero image dengan overlay gelap + CTA buttons
3. **Bottom Section** - Dark footer dengan IMI logo putih, links, dan social icons

## Alternative: Using Existing Assets

Jika IMI logo belum tersedia, Anda bisa:
1. Menggunakan logo Raho sementara sebagai placeholder
2. Membuat simple text-based logo dengan CSS
3. Request logo dari tim IMI atau partnership team
