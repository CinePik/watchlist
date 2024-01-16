import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Show, ShowComment } from '@prisma/client';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddShowWatchlistDto } from './dto/request/add-watchlist.dto';
import { CreateShowCommentDto } from './dto/request/create-comment.dto';
import { UpdateShowCommentDto } from './dto/request/update-comment.dto';
import { ShowRecommendationResponseDto } from './dto/response/recommendation-response.dto';

@Injectable()
export class ShowsService {
  private readonly logger = new Logger(ShowsService.name);
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

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

  findAllShowComments(
    userId: number,
    showId: number,
    season: number,
    episode: number,
  ): Promise<ShowComment[]> {
    return this.prisma.showComment.findMany({
      where: {
        show: {
          AND: [{ showId }, { userId }, { episode }, { season }],
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

  async getShowRecommendations(
    userId: number,
  ): Promise<ShowRecommendationResponseDto[]> {
    const ids = await this.prisma.show.findMany({
      select: {
        showId: true,
      },
      where: {
        userId,
      },
      distinct: ['showId'],
    });

    const { data } = await firstValueFrom(
      this.httpService
        .get<any>('http://localhost:3003/recommendations/shows', {
          params: {
            showIds: ids.map((show) => show.showId).join(','),
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            const message = error.response.data;
            const status = error.response.status;

            this.logger.warn(
              `Get show recommendations failed with status ${status}`,
              message,
            );
            throw new HttpException(message, status);
          }),
        ),
    );

    return data;
  }
}
