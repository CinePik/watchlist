import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieCommentDto } from './dto/request/create-comment.dto';
import { MovieComment } from '@prisma/client';
import { UpdateMovieCommentDto } from './dto/request/update-comment.dto';
import { UpdateMovieWatchedDto } from './dto/request/update-watched.dto';
@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  create(createMovieCommentDto: CreateMovieCommentDto): Promise<MovieComment> {
    return this.prisma.movieComment.create({ data: createMovieCommentDto });
  }

  findAll(): Promise<MovieComment[]> {
    return this.prisma.movieComment.findMany();
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
    updateMovieCommentDto: UpdateMovieWatchedDto,
  ): Promise<any> {
    return this.prisma.movie.update({
      where: { id },
      data: updateMovieCommentDto,
    });
  }

  remove(id: number): Promise<MovieComment> {
    return this.prisma.movieComment.delete({ where: { id } });
  }
}
