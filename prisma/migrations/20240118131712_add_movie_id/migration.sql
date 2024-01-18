/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `movieId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Movie_userId_id_key";

-- AlterTable
CREATE SEQUENCE movie_id_seq;
ALTER TABLE "Movie" ADD COLUMN     "movieId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('movie_id_seq');
ALTER SEQUENCE movie_id_seq OWNED BY "Movie"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Movie_userId_movieId_key" ON "Movie"("userId", "movieId");
