/*
  Warnings:

  - You are about to drop the column `overview` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `poster_path` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `poster_path` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Show` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "overview",
DROP COLUMN "poster_path",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "overview",
DROP COLUMN "poster_path",
DROP COLUMN "title";
