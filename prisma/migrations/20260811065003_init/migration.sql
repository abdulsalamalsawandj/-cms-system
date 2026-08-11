/*
  Warnings:

  - You are about to drop the column `data` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `sectionId` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nameAr` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `properties` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAr` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_pageId_fkey";

-- DropIndex
DROP INDEX "Page_slug_key";

-- AlterTable
ALTER TABLE "Component" DROP COLUMN "data",
DROP COLUMN "index",
DROP COLUMN "sectionId",
DROP COLUMN "type",
ADD COLUMN     "nameAr" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "properties" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "slug",
DROP COLUMN "title",
ADD COLUMN     "nameAr" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "passwordHash" TEXT NOT NULL;

-- DropTable
DROP TABLE "Section";

-- DropEnum
DROP TYPE "ComponentType";

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageComponent" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "pageId" INTEGER NOT NULL,
    "componentId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageComponent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_uuid_key" ON "RefreshToken"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "PageComponent_uuid_key" ON "PageComponent"("uuid");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageComponent" ADD CONSTRAINT "PageComponent_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageComponent" ADD CONSTRAINT "PageComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageComponent" ADD CONSTRAINT "PageComponent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "PageComponent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
