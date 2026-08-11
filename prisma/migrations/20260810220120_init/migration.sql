-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CONTENT_CREATOR', 'VISITOR');

-- CreateEnum
CREATE TYPE "ComponentType" AS ENUM ('CARD', 'SLIDER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VISITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "index" INTEGER NOT NULL DEFAULT 0,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "pageId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Component" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" "ComponentType" NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "data" JSONB NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "adminReply" TEXT,
    "repliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Page_uuid_key" ON "Page"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_createdById_idx" ON "Page"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "Section_uuid_key" ON "Section"("uuid");

-- CreateIndex
CREATE INDEX "Section_pageId_idx" ON "Section"("pageId");

-- CreateIndex
CREATE INDEX "Section_createdById_idx" ON "Section"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "Component_uuid_key" ON "Component"("uuid");

-- CreateIndex
CREATE INDEX "Component_sectionId_idx" ON "Component"("sectionId");

-- CreateIndex
CREATE INDEX "Component_createdById_idx" ON "Component"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "ContactMessage_uuid_key" ON "ContactMessage"("uuid");

-- CreateIndex
CREATE INDEX "ContactMessage_visitorId_idx" ON "ContactMessage"("visitorId");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMessage" ADD CONSTRAINT "ContactMessage_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
