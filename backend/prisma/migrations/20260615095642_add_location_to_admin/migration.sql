-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "locationId" TEXT;

-- CreateIndex
CREATE INDEX "Admin_locationId_idx" ON "Admin"("locationId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
