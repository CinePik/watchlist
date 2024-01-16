import { BadRequestException, Injectable } from '@nestjs/common';
import { Movie, MovieComment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMovieWatchlistDto } from './dto/request/add-watchlist.dto';
import { CreateMovieCommentDto } from './dto/request/create-comment.dto';
import { UpdateMovieCommentDto } from './dto/request/update-comment.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

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
}
