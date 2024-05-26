-- AlterTable
ALTER TABLE "Follows" ADD COLUMN     "requestAcc" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "publicAcc" BOOLEAN NOT NULL DEFAULT true;
