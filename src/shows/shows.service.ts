import { BadRequestException, Injectable } from '@nestjs/common';
import { Show, ShowComment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddShowWatchlistDto } from './dto/request/add-watchlist.dto';
import { CreateShowCommentDto } from './dto/request/create-comment.dto';
import { UpdateShowCommentDto } from './dto/request/update-comment.dto';

@Injectable()
export class ShowsService {
  constructor(private prisma: PrismaService) {}

  async addShowWatchlist(
    addShowWatchlistDto: AddShowWatchlistDto,
  ): Promise<Show> {
    try {
      return await this.prisma.show.create({
        data: {
          userId: addShowWatchlistDto.userId,
          episode: addShowWatchlistDto.episode,
          season: addShowWatchlistDto.season,
          showId: addShowWatchlistDto.showId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  getShowWatchlist(userId: number): Promise<Show[]> {
    return this.prisma.show.findMany({
      where: {
        userId,
      },
    });
  }

  removeShowWatchlist(id: number): Promise<Show> {
    return this.prisma.show.delete({ where: { id } });
  }

  async createShowComment(
    createShowCommentDto: CreateShowCommentDto,
  ): Promise<ShowComment> {
    let show;
    if (
      (await this.prisma.show.count({
        where: {
          AND: [
            { showId: createShowCommentDto.showId },
            { userId: createShowCommentDto.userId },
            { episode: createShowCommentDto.episode },
            { season: createShowCommentDto.season },
          ],
        },
      })) === 0
    ) {
      show = await this.prisma.show.create({
        data: {
          showId: createShowCommentDto.showId,
          userId: createShowCommentDto.userId,
          episode: createShowCommentDto.episode,
          season: createShowCommentDto.season,
        },
      });
    } else {
      show = await this.prisma.show.findFirst({
        where: {
          AND: [
            { showId: createShowCommentDto.showId },
            { userId: createShowCommentDto.userId },
            { episode: createShowCommentDto.episode },
            { season: createShowCommentDto.season },
          ],
        },
      });
    }
    return this.prisma.showComment.create({
      data: {
        showId: show.id,
        comment: createShowCommentDto.comment,
        rating: createShowCommentDto.rating,
      },
    });
  }

  findAllShowComments(showId: number): Promise<ShowComment[]> {
    return this.prisma.showComment.findMany({
      where: {
        show: {
          showId: showId,
        },
      },
    });
  }

  updateShowComment(
    id: number,
    updateShowCommentDto: UpdateShowCommentDto,
  ): Promise<ShowComment> {
    return this.prisma.showComment.update({
      where: { id },
      data: {
        comment: updateShowCommentDto.comment,
        rating: updateShowCommentDto.rating,
      },
    });
  }

  removeShowComment(id: number): Promise<ShowComment> {
    return this.prisma.showComment.delete({ where: { id } });
  }
}
