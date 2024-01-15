import { Injectable } from '@nestjs/common';
import { ShowComment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShowCommentDto } from './dto/request/create-comment.dto';
import { UpdateShowCommentDto } from './dto/request/update-comment.dto';
import { UpdateShowWatchedDto } from './dto/request/update-watched.dto';

@Injectable()
export class ShowsService {
  constructor(private prisma: PrismaService) {}

  async create(
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
          watched: createShowCommentDto.watched,
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

  findAll(showId: number): Promise<ShowComment[]> {
    return this.prisma.showComment.findMany({ where: { showId } });
  }

  update(
    id: number,
    updateShowCommentDto: UpdateShowCommentDto,
  ): Promise<ShowComment> {
    return this.prisma.showComment.update({
      where: { id },
      data: updateShowCommentDto,
    });
  }

  updateWatched(
    id: number,
    updateShowWatchedDto: UpdateShowWatchedDto,
  ): Promise<any> {
    return this.prisma.show.update({
      where: { id },
      data: updateShowWatchedDto,
    });
  }

  remove(id: number): Promise<ShowComment> {
    return this.prisma.showComment.delete({ where: { id } });
  }
}
