/*
  Warnings:

  - A unique constraint covering the columns `[userId,showId,season,episode]` on the table `Show` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `showId` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Show_userId_id_season_episode_key";

-- AlterTable
CREATE SEQUENCE show_id_seq;
ALTER TABLE "Show" ADD COLUMN     "showId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('show_id_seq');
ALTER SEQUENCE show_id_seq OWNED BY "Show"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Show_userId_showId_season_episode_key" ON "Show"("userId", "showId", "season", "episode");
