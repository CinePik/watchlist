import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Movie, MovieComment } from '@prisma/client';
import { Unprotected } from 'nest-keycloak-connect';
import { AddMovieWatchlistDto } from './dto/request/add-watchlist.dto';
import { CreateMovieCommentDto } from './dto/request/create-comment.dto';
import { UpdateMovieCommentDto } from './dto/request/update-comment.dto';
import { MovieCommentResponseDto } from './dto/response/comment.dto';
import { MovieDetailWrapperResponseDto } from './dto/response/movie-detail-wrapper-response.dto';
import { MoviesService } from './movies.service';

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

  @Post('watchlist')
  @Unprotected()
  @ApiOkResponse({
    description: 'Movie added to the watchlist successfully.',
  })
  @ApiOperation({
    summary: 'Add a movie to the watchlist',
    description: 'Adds a movie to the user watchlist.',
  })
  addMovieWatchlist(
    @Body() addMovieWatchlistDto: AddMovieWatchlistDto,
  ): Promise<Movie> {
    return this.moviesService.addMovieWatchlist(addMovieWatchlistDto);
  }

  @Delete('watchlist/:id')
  @Unprotected()
  @ApiOkResponse({
    description: 'Movie deleted from the watchlist successfully.',
  })
  @ApiOperation({
    summary: 'Deletes a movie from the watchlist',
    description: 'Deletes a movie from the user watchlist.',
  })
  removeMovieWatchlist(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.removeMovieWatchlist(+id);
  }

  @Get('watchlist/:userId')
  @Unprotected()
  @ApiOkResponse({
    description: 'Movie watchlist successfully found.',
    type: [MovieDetailWrapperResponseDto],
  })
  @ApiOperation({
    summary: 'Returns all movies on the watchlist',
    description: 'Returns all movies on the user watchlist.',
  })
  getMovieWatchlist(
    @Param('userId') userId: string,
  ): Promise<MovieDetailWrapperResponseDto[]> {
    return this.moviesService.getMovieWatchlist(userId);
  }

  @Get('recommendations/:userId')
  @Unprotected()
  @ApiOkResponse({
    description: 'Movie recommendations successfully found.',
  })
  @ApiOperation({
    summary: 'Returns all movie recommendations',
    description: 'Returns all movies recommendations based on user watchlist.',
  })
  getMovieRecommendations(@Param('userId') userId: string) {
    return this.moviesService.getMovieRecommendations(userId);
  }

  @Post('comments')
  @Unprotected()
  @ApiOkResponse({
    description: 'Movie comment successfully created.',
    type: [MovieCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Create movie comment',
    description: 'Creates a user movie comment.',
  })
  createMovieComment(
    @Body() createMovieCommentDto: CreateMovieCommentDto,
  ): Promise<MovieComment> {
    return this.moviesService.createMovieComment(createMovieCommentDto);
  }

  @Get('comments/:tmdbMovieId')
  @Unprotected()
  @ApiOkResponse({
    description: 'Movie comments successfully found.',
    type: [MovieCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Returns all movie comments',
    description: 'Returns all movies comments for a specific movie.',
  })
  findAllMovieComments(@Param('tmdbMovieId') movieId: string) {
    return this.moviesService.findAllMovieComments(+movieId);
  }

  @Patch('comments/:id')
  @Unprotected()
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
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieCommentDto,
  ): Promise<MovieComment> {
    return this.moviesService.updateMovieComment(+id, updateMovieDto);
  }

  @Delete('comments/:id')
  @Unprotected()
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
  remove(@Param('id') id: string): Promise<MovieComment> {
    return this.moviesService.removeMovieComment(+id);
  }
}
