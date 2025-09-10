/*
  Warnings:

  - You are about to drop the column `titleAr` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionAr` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `nameAr` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "titleAr",
ADD COLUMN     "title_ar" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "descriptionAr",
DROP COLUMN "nameAr",
ADD COLUMN     "description_ar" TEXT,
ADD COLUMN     "name_ar" TEXT;
