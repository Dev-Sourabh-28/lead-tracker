/*
  Warnings:

  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_userId_fkey";

-- DropTable
DROP TABLE "Lead";

-- DropEnum
DROP TYPE "LeadStatus";

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "bio" TEXT,
    "theme" TEXT NOT NULL DEFAULT 'minimal',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "portfolioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_slug_key" ON "Portfolio"("slug");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
