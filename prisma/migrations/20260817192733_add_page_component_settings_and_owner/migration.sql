/*
  Warnings:

  - Added the required column `createdById` to the `PageComponent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PageComponent" ADD COLUMN     "componentSettings" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "createdById" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PageComponent" ADD CONSTRAINT "PageComponent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
