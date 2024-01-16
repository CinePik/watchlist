-- DropForeignKey
ALTER TABLE "MovieComment" DROP CONSTRAINT "MovieComment_movieId_fkey";

-- DropForeignKey
ALTER TABLE "ShowComment" DROP CONSTRAINT "ShowComment_showId_fkey";

-- AddForeignKey
ALTER TABLE "MovieComment" ADD CONSTRAINT "MovieComment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowComment" ADD CONSTRAINT "ShowComment_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
