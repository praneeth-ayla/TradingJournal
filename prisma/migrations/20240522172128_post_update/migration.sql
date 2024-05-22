/*
  Warnings:

  - Changed the type of `postedOn` on the `Posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "elements" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "postedOn",
ADD COLUMN     "postedOn" TIMESTAMP(3) NOT NULL;
