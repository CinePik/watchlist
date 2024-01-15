import { Injectable } from '@nestjs/common';
import { ShowComment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShowCommentDto } from './dto/request/create-comment.dto';
import { UpdateShowCommentDto } from './dto/request/update-comment.dto';
import { UpdateShowWatchedDto } from './dto/request/update-watched.dto';

@Injectable()
export class ShowsService {
  constructor(private prisma: PrismaService) {}

  create(createShowCommentDto: CreateShowCommentDto): Promise<ShowComment> {
    return this.prisma.showComment.create({ data: createShowCommentDto });
  }

  findAll(): Promise<ShowComment[]> {
    return this.prisma.showComment.findMany();
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
