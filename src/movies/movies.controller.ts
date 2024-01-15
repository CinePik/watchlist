import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateMovieCommentDto } from './dto/request/create-comment.dto';
import { MovieComment } from '@prisma/client';
import { UpdateMovieWatchedDto } from './dto/request/update-watched.dto';
import { UpdateMovieCommentDto } from './dto/request/update-comment.dto';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { MovieCommentResponseDto } from './dto/response/comment.dto';

@Controller('movies')
@ApiTags('movies')
@ApiInternalServerErrorResponse({
  description: 'There was an error processing this request.',
})
@ApiBadRequestResponse({
  description: 'Bad request.',
})
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @Unprotected()
  @ApiOkResponse({
    description: 'Movie comment successfully created.',
    type: [MovieCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Create movie comment',
    description: 'Creates a user movie comment.',
  })
  create(
    @Body() createMovieCommentDto: CreateMovieCommentDto,
  ): Promise<MovieComment> {
    return this.moviesService.create(createMovieCommentDto);
  }

  @Get()
  @Unprotected()
  @ApiOkResponse({
    description: 'Movie comments successfully found.',
    type: [MovieCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Returns all movie comments',
    description: 'Returns all movies comments for a specific movie.',
  })
  findAll(@Query('movieId') movieId: string) {
    return this.moviesService.findAll(+movieId);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Movie comment successfully updated.',
    type: [MovieCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Updates movie comment',
    description: 'Updates a specific movie comment.',
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized correctly.',
  })
  @Roles({ roles: ['realm:app-admin'] })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieCommentDto,
  ): Promise<MovieComment> {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Patch('watched/:id')
  @ApiOkResponse({
    description: 'Movie watched successfully updated.',
  })
  @ApiOperation({
    summary: 'Updates movie watched status',
    description: 'Updates movie watched status for a specific movie.',
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized correctly.',
  })
  @Roles({ roles: ['realm:app-admin'] })
  @ApiBearerAuth()
  updateWatched(
    @Param('id') movieId: string,
    @Body() updateMovieWatchedDto: UpdateMovieWatchedDto,
  ): Promise<any> {
    return this.moviesService.updateWatched(+movieId, updateMovieWatchedDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Movie comment successfully deleted.',
    type: [MovieCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Deletes a movie comment',
    description: 'Deletes a specific movie comment.',
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized correctly.',
  })
  @ApiBearerAuth()
  @Roles({ roles: ['realm:app-admin'] })
  remove(@Param('id') id: string): Promise<MovieComment> {
    return this.moviesService.remove(+id);
  }
}
