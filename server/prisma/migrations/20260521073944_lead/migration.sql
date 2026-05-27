-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('ENQUIRY', 'IN_PROGRESS', 'CLIENT', 'CLOSED');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoone" TEXT NOT NULL,
    "email" TEXT,
    "company" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'ENQUIRY',
    "notes" TEXT,
    "appointment" TIMESTAMP(3),
    "reminder" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
