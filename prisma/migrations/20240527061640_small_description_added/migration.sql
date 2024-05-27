/*
  Warnings:

  - Made the column `description` on table `Posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "note" TEXT,
ALTER COLUMN "description" SET NOT NULL;
