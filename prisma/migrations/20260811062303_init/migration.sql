/*
  Warnings:

  - You are about to drop the column `nameAR` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `nameEN` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `isVisible` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `nameAR` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `nameEN` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `nameAR` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `nameEN` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionComponent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Component` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `createdById` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Page` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `createdById` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Section` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CONTENT_CREATOR', 'VISITOR');

-- CreateEnum
CREATE TYPE "ComponentType" AS ENUM ('CARD', 'SLIDER');

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_parentId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "SectionComponent" DROP CONSTRAINT "SectionComponent_componentId_fkey";

-- DropForeignKey
ALTER TABLE "SectionComponent" DROP CONSTRAINT "SectionComponent_sectionId_fkey";

-- DropIndex
DROP INDEX "Component_uuid_key";

-- DropIndex
DROP INDEX "Page_uuid_key";

-- DropIndex
DROP INDEX "Section_uuid_key";

-- DropIndex
DROP INDEX "User_uuid_key";

-- AlterTable
ALTER TABLE "Component" DROP COLUMN "nameAR",
DROP COLUMN "nameEN",
DROP COLUMN "parentId",
DROP COLUMN "uuid",
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "sectionId" INTEGER NOT NULL,
ADD COLUMN     "type" "ComponentType" NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "isVisible",
DROP COLUMN "nameAR",
DROP COLUMN "nameEN",
DROP COLUMN "uuid",
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "nameAR",
DROP COLUMN "nameEN",
DROP COLUMN "uuid",
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt",
DROP COLUMN "uuid",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'VISITOR';

-- DropTable
DROP TABLE "RefreshToken";

-- DropTable
DROP TABLE "SectionComponent";

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" SERIAL NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "adminReply" TEXT,
    "repliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMessage" ADD CONSTRAINT "ContactMessage_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
