/*
  Warnings:

  - You are about to drop the column `movieId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `showId` on the `Show` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,tmdbMovieId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,tmdbShowId,season,episode]` on the table `Show` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tmdbMovieId` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmdbShowId` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Movie_userId_movieId_key";

-- DropIndex
DROP INDEX "Show_userId_showId_season_episode_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "movieId",
ADD COLUMN     "tmdbMovieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "showId",
ADD COLUMN     "tmdbShowId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_userId_tmdbMovieId_key" ON "Movie"("userId", "tmdbMovieId");

-- CreateIndex
CREATE UNIQUE INDEX "Show_userId_tmdbShowId_season_episode_key" ON "Show"("userId", "tmdbShowId", "season", "episode");
