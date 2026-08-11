/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Component` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `ContactMessage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Component` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `ContactMessage` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `Page` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `Section` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Component_uuid_key" ON "Component"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ContactMessage_uuid_key" ON "ContactMessage"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Page_uuid_key" ON "Page"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Section_uuid_key" ON "Section"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");
