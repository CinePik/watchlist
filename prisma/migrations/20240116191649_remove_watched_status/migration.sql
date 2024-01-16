/*
  Warnings:

  - You are about to drop the column `watched` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `watched` on the `Show` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "watched";

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "watched";
