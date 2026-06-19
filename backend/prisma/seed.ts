import { PrismaClient } from '@prisma/client';
import * as Minio from 'minio';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { 
  penyakitArticles, 
  tindakanMedisArticles, 
  kisahPasienArticles,
  seedPartnerships,
  locations,
  admins,
  hashPassword,
} from './seeds';

dotenv.config();

const prisma = new PrismaClient();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'minio',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
});

const bucketName = process.env.MINIO_BUCKET || 'raho-uploads';

async function uploadLogoToMinio(fileName: string): Promise<string> {
  try {
    const logoPath = path.join(__dirname, '../frontend/public/assets/icon.png');
    
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

    const apiPrefix = process.env.API_PREFIX || '/api';
    const filePath = `${apiPrefix}/files/${uniqueFileName}`;
    console.log(`Uploaded image: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Error uploading to MinIO:', error);
    return '';
  }
}

async function seedArticles() {
  console.log('Seeding articles...');

  let createdCount = 0;
  let updatedCount = 0;

  // Seed Penyakit Articles
  for (const article of penyakitArticles) {
    const existing = await prisma.article.findUnique({ where: { slug: article.slug } });
    const imageUrl = existing?.imageUrl || await uploadLogoToMinio(article.slug);
    
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        ...article,
        imageUrl: imageUrl || null,
        published: true,
      },
      create: {
        ...article,
        imageUrl: imageUrl || null,
        published: true,
      },
    });
    
    if (existing) {
      updatedCount++;
      console.log(`✓ Updated article: ${article.title}`);
    } else {
      createdCount++;
      console.log(`✓ Created article: ${article.title}`);
    }
  }

  // Seed Tindakan Medis Articles
  for (const article of tindakanMedisArticles) {
    const existing = await prisma.article.findUnique({ where: { slug: article.slug } });
    const imageUrl = existing?.imageUrl || await uploadLogoToMinio(article.slug);
    
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        ...article,
        imageUrl: imageUrl || null,
        published: true,
      },
      create: {
        ...article,
        imageUrl: imageUrl || null,
        published: true,
      },
    });
    
    if (existing) {
      updatedCount++;
      console.log(`✓ Updated article: ${article.title}`);
    } else {
      createdCount++;
      console.log(`✓ Created article: ${article.title}`);
    }
  }

  // Seed Kisah Pasien Articles
  for (const article of kisahPasienArticles) {
    const existing = await prisma.article.findUnique({ where: { slug: article.slug } });
    const imageUrl = existing?.imageUrl || await uploadLogoToMinio(article.slug);
    
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        ...article,
        imageUrl: imageUrl || null,
        published: true,
      },
      create: {
        ...article,
        imageUrl: imageUrl || null,
        published: true,
      },
    });
    
    if (existing) {
      updatedCount++;
      console.log(`✓ Updated article: ${article.title}`);
    } else {
      createdCount++;
      console.log(`✓ Created article: ${article.title}`);
    }
  }

  console.log(`\n✓ Articles processed: ${createdCount} created, ${updatedCount} updated\n`);
}

async function seedLocations() {
  console.log('Seeding locations...');

  let createdCount = 0;
  let updatedCount = 0;

  for (const location of locations) {
    // Check if location exists by matching name and city
    const existing = await (prisma as any).location.findFirst({
      where: {
        name: location.name,
        city: location.city,
      },
    });

    if (existing) {
      await (prisma as any).location.update({
        where: { id: existing.id },
        data: location,
      });
      updatedCount++;
      console.log(`✓ Updated location: ${location.name} - ${location.city}`);
    } else {
      await (prisma as any).location.create({
        data: location,
      });
      createdCount++;
      console.log(`✓ Created location: ${location.name} - ${location.city}`);
    }
  }

  console.log(`\n✓ Locations processed: ${createdCount} created, ${updatedCount} updated\n`);
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

  let createdCount = 0;
  let updatedCount = 0;

  for (const admin of admins) {
    const existing = await prisma.admin.findUnique({ where: { username: admin.username } });
    
    if (existing) {
      // Update existing admin but keep the existing password if not explicitly changing it
      await prisma.admin.update({
        where: { username: admin.username },
        data: {
          email: admin.email,
          name: admin.name,
          role: admin.role,
          isActive: admin.isActive,
        },
      });
      updatedCount++;
      console.log(`✓ Updated admin: ${admin.username} (${admin.role}) - password unchanged`);
    } else {
      // Create new admin with hashed password
      const hashedPassword = await hashPassword(admin.password);
      await prisma.admin.create({
        data: {
          ...admin,
          password: hashedPassword,
        },
      });
      createdCount++;
      console.log(`✓ Created admin: ${admin.username} (${admin.role})`);
    }
  }

  console.log(`\n✓ Admins processed: ${createdCount} created, ${updatedCount} updated\n`);
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
    await seedPartnerships();
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
