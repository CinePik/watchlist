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
import { MovieDetailResponseDto } from './dto/response/movie-detail-response.dto';
import { MovieDetailWrapperResponseDto } from './dto/response/movie-detail-wrapper-response.dto';
import { MovieRecommendationResponseDto } from './dto/response/recommendation-response.dto';
import { SimilarMovieDetailResponseDto } from './dto/response/similar-movie-response.dto';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
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

  async getMovieWatchlist(
    userId: number,
  ): Promise<MovieDetailWrapperResponseDto[]> {
    const ids = await this.prisma.movie.findMany({
      select: {
        id: true,
      },
      where: {
        userId,
      },
    });

    const movies: Array<MovieDetailWrapperResponseDto> = [];

    for (const id in ids) {
      try {
        const { data } = await firstValueFrom(
          this.httpService.get<any>(
            `https://movies-api14.p.rapidapi.com/movie/${id}`,
            {
              headers: {
                'X-RapidAPI-Key': this.apiKey,
                'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com',
              },
            },
          ),
        );

        const dataMovie = data.movie;
        const movie: MovieDetailResponseDto = {
          id: dataMovie._id,
          title: dataMovie.title,
          backdrop_path: dataMovie.backdrop_path,
          genres: dataMovie.genres,
          original_title: dataMovie.original_title,
          overview: dataMovie.overview,
          poster_path: dataMovie.poster_path,
          release_date: dataMovie.release_date,
          vote_average: dataMovie.vote_average,
          vote_count: dataMovie.vote_count,
          youtube_trailer: dataMovie.youtube_trailer,
          sources: dataMovie.sources,
        };

        const similarMovies: Array<SimilarMovieDetailResponseDto> = [];

        for (const similarMovie of data.similarMovies) {
          similarMovies.push({
            id: similarMovie._id,
            title: similarMovie.title,
            backdrop_path: similarMovie.backdrop_path,
            poster_path: similarMovie.poster_path,
          });
        }

        const movieWrapper: MovieDetailWrapperResponseDto =
          new MovieDetailWrapperResponseDto();
        movieWrapper.movie = movie;
        movieWrapper.similarMovies = similarMovies;
        movies.push(movieWrapper);
      } catch (error) {
        this.logger.warn(`Get movie failed with error`, error);
      }
    }

    return movies;
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
