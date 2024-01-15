import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieCommentDto } from './dto/request/create-comment.dto';
import { MovieComment } from '@prisma/client';
import { UpdateMovieCommentDto } from './dto/request/update-comment.dto';
import { UpdateMovieWatchedDto } from './dto/request/update-watched.dto';
import { Movie } from './entities/movie.entity';
@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createMovieCommentDto: CreateMovieCommentDto,
  ): Promise<MovieComment> {
    if (
      (await this.prisma.movie.count({
        where: { id: createMovieCommentDto.movieId },
      })) === 0
    ) {
      await this.prisma.movie.create({
        data: {
          id: createMovieCommentDto.movieId,
          watched: createMovieCommentDto.watched,
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

  findAll(movieId: number): Promise<MovieComment[]> {
    return this.prisma.movieComment.findMany({
      where: {
        movie: {
          id: movieId,
        },
      },
    });
  }

  update(
    id: number,
    updateMovieCommentDto: UpdateMovieCommentDto,
  ): Promise<MovieComment> {
    return this.prisma.movieComment.update({
      where: { id },
      data: updateMovieCommentDto,
    });
  }

  updateWatched(
    id: number,
    updateMovieWatchedDto: UpdateMovieWatchedDto,
  ): Promise<any> {
    return this.prisma.movie.update({
      where: { id },
      data: {
        watched: updateMovieWatchedDto.watched,
      },
    });
  }

  remove(id: number): Promise<MovieComment> {
    return this.prisma.movieComment.delete({ where: { id } });
  }
}
