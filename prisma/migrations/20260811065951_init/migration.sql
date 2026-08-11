/*
  Warnings:

  - You are about to drop the column `pageId` on the `PageComponent` table. All the data in the column will be lost.
  - Added the required column `sectionId` to the `PageComponent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PageComponent" DROP CONSTRAINT "PageComponent_pageId_fkey";

-- AlterTable
ALTER TABLE "PageComponent" DROP COLUMN "pageId",
ADD COLUMN     "sectionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "pageId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_uuid_key" ON "Section"("uuid");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageComponent" ADD CONSTRAINT "PageComponent_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
