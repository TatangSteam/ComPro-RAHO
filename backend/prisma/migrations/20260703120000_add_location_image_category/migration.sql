-- AlterTable
ALTER TABLE "Location" ADD COLUMN "imageUrl" TEXT;
ALTER TABLE "Location" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'partnership';
