/*
  Warnings:

  - Added the required column `overview` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Show" ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;
