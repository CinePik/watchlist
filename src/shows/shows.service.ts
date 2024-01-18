import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Show, ShowComment } from '@prisma/client';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShowEpisodeResponseDto } from 'src/shows/dto/response/show-episode-response.dto';
import { ShowSeasonsResponseDto } from 'src/shows/dto/response/show-season-response.dto';
import { AddShowWatchlistDto } from './dto/request/add-watchlist.dto';
import { CreateShowCommentDto } from './dto/request/create-comment.dto';
import { UpdateShowCommentDto } from './dto/request/update-comment.dto';
import { ShowRecommendationResponseDto } from './dto/response/recommendation-response.dto';
import { ShowDetailResponseDto } from './dto/response/show-detail-response.dto';
import { ShowDetailWrapperResponseDto } from './dto/response/show-detail-wrapper-response.dto';

@Injectable()
export class ShowsService {
  private readonly logger = new Logger(ShowsService.name);
  private recommendationsUrl: string;
  private apiKey;
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.recommendationsUrl = this.configService.get(
      'RECOMMENDATION_SERVICE_URL',
    );
    this.apiKey = this.configService.get('MOVIES_RAPID_API_KEY');
  }

  async addShowWatchlist(
    addShowWatchlistDto: AddShowWatchlistDto,
  ): Promise<Show> {
    try {
      return await this.prisma.show.create({
        data: {
          userId: addShowWatchlistDto.userId,
          episode: addShowWatchlistDto.episode,
          season: addShowWatchlistDto.season,
          tmdbShowId: addShowWatchlistDto.showId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getShowWatchlist(
    userId: string,
  ): Promise<ShowDetailWrapperResponseDto[]> {
    const watchlistShows = await this.prisma.show.findMany({
      select: {
        id: true,
        tmdbShowId: true,
        episode: true,
        season: true,
      },
      where: {
        userId,
      },
    });

    const shows: Array<ShowDetailWrapperResponseDto> = [];

    for (const watchlistShow of watchlistShows) {
      try {
        const { data } = await firstValueFrom(
          this.httpService.get<any>(
            `https://movies-api14.p.rapidapi.com/show/${watchlistShow.tmdbShowId}`,
            {
              headers: {
                'X-RapidAPI-Key': this.apiKey,
                'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com',
              },
            },
          ),
        );

        const dataShow = data.show;
        const show: ShowDetailResponseDto = {
          id: watchlistShow.id,
          tmdbId: dataShow._id,
          title: dataShow.title,
          backdrop_path: dataShow.backdrop_path,
          genres: dataShow.genres,
          original_title: dataShow.original_title,
          overview: dataShow.overview,
          poster_path: dataShow.poster_path,
          first_aired: dataShow.first_aired,
          vote_average: dataShow.vote_average,
          vote_count: dataShow.vote_count,
          youtube_trailer: dataShow.youtube_trailer,
          sources: dataShow.sources,
        };

        const seasons: Array<ShowSeasonsResponseDto> = [];

        for (const season of data.seasons) {
          const dataEpisodes = season.episodes;
          const episodes: Array<ShowEpisodeResponseDto> = [];
          for (const episode of dataEpisodes) {
            episodes.push({
              id: episode._id,
              episode_number: episode.episode_number,
              first_aired: episode.first_aired,
              season_number: episode.season_number,
              show_id: episode.show_id,
              sources: episode.sources,
              thumbnail_path: episode.thumbnail_path,
              title: episode.title,
              availability: episode.availability,
            });
          }
          seasons.push({
            season: season.season,
            episodes: episodes,
          });
        }

        const showWrapper: ShowDetailWrapperResponseDto =
          new ShowDetailWrapperResponseDto();
        showWrapper.show = show;
        showWrapper.seasons = seasons;
        showWrapper.episode = watchlistShow.episode;
        showWrapper.season = watchlistShow.season;
        shows.push(showWrapper);
      } catch (error) {
        this.logger.warn(`Get show failed with error`, error);
      }
    }

    return shows;
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
            { tmdbShowId: createShowCommentDto.showId },
            { userId: createShowCommentDto.userId },
            { episode: createShowCommentDto.episode },
            { season: createShowCommentDto.season },
          ],
        },
      })) === 0
    ) {
      show = await this.prisma.show.create({
        data: {
          tmdbShowId: createShowCommentDto.showId,
          userId: createShowCommentDto.userId,
          episode: createShowCommentDto.episode,
          season: createShowCommentDto.season,
        },
      });
    } else {
      show = await this.prisma.show.findFirst({
        where: {
          AND: [
            { tmdbShowId: createShowCommentDto.showId },
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
    userId: string,
    showId: number,
    season: number,
    episode: number,
  ): Promise<ShowComment[]> {
    return this.prisma.showComment.findMany({
      where: {
        show: {
          AND: [{ tmdbShowId: showId }, { userId }, { episode }, { season }],
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
    userId: string,
  ): Promise<ShowRecommendationResponseDto[]> {
    const ids = await this.prisma.show.findMany({
      select: {
        tmdbShowId: true,
      },
      where: {
        userId,
      },
      distinct: ['tmdbShowId'],
    });

    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(`${this.recommendationsUrl}/recommendations/shows`, {
          params: {
            showIds: ids.map((show) => show.tmdbShowId).join(','),
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
