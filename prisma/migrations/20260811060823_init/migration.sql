/*
  Warnings:

  - You are about to drop the column `createdById` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `sectionId` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ContactMessage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nameAR` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEN` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAR` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEN` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAR` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEN` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "ContactMessage" DROP CONSTRAINT "ContactMessage_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_createdById_fkey";

-- DropIndex
DROP INDEX "Component_createdById_idx";

-- DropIndex
DROP INDEX "Component_sectionId_idx";

-- DropIndex
DROP INDEX "Page_createdById_idx";

-- DropIndex
DROP INDEX "Page_slug_key";

-- DropIndex
DROP INDEX "Section_createdById_idx";

-- DropIndex
DROP INDEX "Section_pageId_idx";

-- AlterTable
ALTER TABLE "Component" DROP COLUMN "createdById",
DROP COLUMN "data",
DROP COLUMN "sectionId",
DROP COLUMN "type",
ADD COLUMN     "nameAR" TEXT NOT NULL,
ADD COLUMN     "nameEN" TEXT NOT NULL,
ADD COLUMN     "parentId" INTEGER,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "createdById",
DROP COLUMN "isPublished",
DROP COLUMN "publishedAt",
DROP COLUMN "slug",
DROP COLUMN "title",
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nameAR" TEXT NOT NULL,
ADD COLUMN     "nameEN" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "createdById",
DROP COLUMN "title",
ADD COLUMN     "nameAR" TEXT NOT NULL,
ADD COLUMN     "nameEN" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "ContactMessage";

-- DropEnum
DROP TYPE "ComponentType";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "SectionComponent" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "componentId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "componentData" JSONB NOT NULL,
    "componentSettings" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionComponent_uuid_key" ON "SectionComponent"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_uuid_key" ON "RefreshToken"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Component"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionComponent" ADD CONSTRAINT "SectionComponent_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionComponent" ADD CONSTRAINT "SectionComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
