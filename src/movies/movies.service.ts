import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Movie, MovieComment } from '@prisma/client';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMovieWatchlistDto } from './dto/request/add-watchlist.dto';
import { CreateMovieCommentDto } from './dto/request/create-comment.dto';
import { UpdateMovieCommentDto } from './dto/request/update-comment.dto';
import { MovieRecommendationResponseDto } from './dto/response/recommendation-response.dto';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  private recommendationsUrl: string;
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.recommendationsUrl = this.configService.get(
      'RECOMMENDATION_SERVICE_URL',
    );
  }

  async addMovieWatchlist(
    addMovieWatchlistDto: AddMovieWatchlistDto,
  ): Promise<Movie> {
    try {
      return await this.prisma.movie.create({
        data: {
          id: addMovieWatchlistDto.movieId,
          userId: addMovieWatchlistDto.userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  getMovieWatchlist(userId: number): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      where: {
        userId,
      },
    });
  }

  removeMovieWatchlist(id: number): Promise<Movie> {
    return this.prisma.movie.delete({ where: { id } });
  }

  async createMovieComment(
    createMovieCommentDto: CreateMovieCommentDto,
  ): Promise<MovieComment> {
    if (
      (await this.prisma.movie.count({
        where: {
          AND: [
            { id: createMovieCommentDto.movieId },
            { userId: createMovieCommentDto.userId },
          ],
        },
      })) === 0
    ) {
      await this.prisma.movie.create({
        data: {
          id: createMovieCommentDto.movieId,
          userId: createMovieCommentDto.userId,
        },
      });
    }
    return this.prisma.movieComment.create({
      data: {
        movieId: createMovieCommentDto.movieId,
        comment: createMovieCommentDto.comment,
        rating: createMovieCommentDto.rating,
      },
    });
  }

  findAllMovieComments(movieId: number): Promise<MovieComment[]> {
    return this.prisma.movieComment.findMany({
      where: {
        movie: {
          id: movieId,
        },
      },
    });
  }

  updateMovieComment(
    id: number,
    updateMovieCommentDto: UpdateMovieCommentDto,
  ): Promise<MovieComment> {
    return this.prisma.movieComment.update({
      where: { id },
      data: updateMovieCommentDto,
    });
  }

  removeMovieComment(id: number): Promise<MovieComment> {
    return this.prisma.movieComment.delete({ where: { id } });
  }

  async getMovieRecommendations(
    userId: number,
  ): Promise<MovieRecommendationResponseDto[]> {
    const ids = await this.prisma.movie.findMany({
      select: {
        id: true,
      },
      where: {
        userId,
      },
    });

    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(`${this.recommendationsUrl}/recommendations/movies`, {
          params: {
            movieIds: ids.map((movie) => movie.id).join(','),
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            const message = error.response.data;
            const status = error.response.status;

            this.logger.warn(
              `Get movie recommendations failed with status ${status}`,
              message,
            );
            throw new HttpException(message, status);
          }),
        ),
    );

    const movies: Array<MovieRecommendationResponseDto> = [];
    for (const movie of data) {
      movies.push({
        id: movie.tmdb_id,
        title: movie.title,
        backdrop_path: movie.tmdb_backdrop_path,
        genres: movie.genres,
        original_title: movie.original_title,
        overview: movie.overview,
        poster_path: movie.tmdb_poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        match_score: movie.match_score,
      });
    }

    return movies;
  }
}
