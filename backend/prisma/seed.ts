import { PrismaClient } from '@prisma/client';
import * as Minio from 'minio';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
<<<<<<< HEAD:backend/src/scripts/seed.ts
import { penyakitArticles, tindakanMedisArticles, kisahPasienArticles } from './seedData/articles';
import { locations } from './seedData/locations';
import { admins, hashPassword } from './seedData/admins';
=======
import { 
  penyakitArticles, 
  tindakanMedisArticles, 
  kisahPasienArticles,
  locations
} from './seeds';
// import { locations } from './seedData/locations';
>>>>>>> 32037d47481dd78a9d64a682ce05d2b863d80f6f:backend/prisma/seed.ts

dotenv.config();

const prisma = new PrismaClient();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
});

const bucketName = process.env.MINIO_BUCKET || 'raho-uploads';

async function uploadLogoToMinio(fileName: string): Promise<string> {
  try {
    const logoPath = path.join(__dirname, '../../../frontend/public/assets/LOGORAHO.png');
    
    if (!fs.existsSync(logoPath)) {
      console.log('Logo file not found, skipping image upload');
      return '';
    }

    const fileBuffer = fs.readFileSync(logoPath);
    const uniqueFileName = `${Date.now()}-${fileName}.png`;

    await minioClient.putObject(
      bucketName,
      uniqueFileName,
      fileBuffer,
      fileBuffer.length,
      {
        'Content-Type': 'image/png',
      }
    );

    const publicUrl = `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${uniqueFileName}`;
    console.log(`Uploaded image: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading to MinIO:', error);
    return '';
  }
}

async function seedArticles() {
  console.log('Seeding articles...');
  
  // Clear existing articles
  await prisma.article.deleteMany({});
  console.log('Cleared existing articles');

  // Seed Penyakit Articles
  for (const article of penyakitArticles) {
    const imageUrl = await uploadLogoToMinio(article.slug);
    await prisma.article.create({
      data: {
        ...article,
        imageUrl: imageUrl || null,
        published: true,
      },
    });
    console.log(`✓ Created article: ${article.title}`);
  }

  // Seed Tindakan Medis Articles
  for (const article of tindakanMedisArticles) {
    const imageUrl = await uploadLogoToMinio(article.slug);
    await prisma.article.create({
      data: {
        ...article,
        imageUrl: imageUrl || null,
        published: true,
      },
    });
    console.log(`✓ Created article: ${article.title}`);
  }

  // Seed Kisah Pasien Articles
  for (const article of kisahPasienArticles) {
    const imageUrl = await uploadLogoToMinio(article.slug);
    await prisma.article.create({
      data: {
        ...article,
        imageUrl: imageUrl || null,
        published: true,
      },
    });
    console.log(`✓ Created article: ${article.title}`);
  }

  console.log(`\n✓ Total articles created: ${penyakitArticles.length + tindakanMedisArticles.length + kisahPasienArticles.length}\n`);
}

async function seedLocations() {
  console.log('Seeding locations...');

  // Clear existing locations
  await (prisma as any).location.deleteMany({});
  console.log('Cleared existing locations');

  for (const location of locations) {
    await (prisma as any).location.create({
      data: location,
    });
    console.log(`✓ Created location: ${location.name} - ${location.city}`);
  }

  console.log(`\n✓ Total locations created: ${locations.length}\n`);
}

async function seedCompanyProfile() {
  console.log('Seeding company profile...');
  
  const existingCompany = await prisma.companyProfile.findFirst();
  if (!existingCompany) {
    const logoUrl = await uploadLogoToMinio('company-logo');
    await prisma.companyProfile.create({
      data: {
        name: 'RAHO Club Premier',
        description: 'Ekosistem riset kesehatan & pemulihan seluler berbasis bioteknologi molekuler dengan Teknologi Nano Bubble. Solusi aging sehat & regenerasi tubuh alami hingga akar masalah.',
        email: 'info@rahoclub.com',
        phone: '+62 812-3456-7890',
        address: 'Jakarta, Indonesia',
        logoUrl: logoUrl || null,
      },
    });
    console.log('✓ Created company profile\n');
  } else {
    console.log('✓ Company profile already exists\n');
  }
}

async function seedAdmins() {
  console.log('Seeding admin users...');

  // Clear existing admins
  await prisma.admin.deleteMany({});
  console.log('Cleared existing admins');

  for (const admin of admins) {
    const hashedPassword = await hashPassword(admin.password);
    await prisma.admin.create({
      data: {
        ...admin,
        password: hashedPassword,
      },
    });
    console.log(`✓ Created admin: ${admin.username} (${admin.role})`);
  }

  console.log(`\n✓ Total admins created: ${admins.length}\n`);
}

async function seed() {
  console.log('========================================');
  console.log('Starting database seeding...');
  console.log('========================================\n');

  try {
    // Check if MinIO is available
    try {
      await minioClient.bucketExists(bucketName);
      console.log('✓ MinIO connection successful\n');
    } catch (error) {
      console.log('⚠️  MinIO not available, seeding without images\n');
    }

    await seedArticles();
    await seedLocations();
    await seedCompanyProfile();
    await seedAdmins();

    console.log('========================================');
    console.log('✓ Seed completed successfully!');
    console.log('========================================');
    
    console.log('\n📋 ADMIN CREDENTIALS:');
    console.log('Username: admin | Password: admin123');
    console.log('Username: superadmin | Password: super123');
    console.log('\n🌐 ACCESS ADMIN PANEL:');
    console.log('URL: http://localhost:3000/admin/login');
    console.log('========================================\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
