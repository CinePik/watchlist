import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Show, ShowComment } from '@prisma/client';
import { Unprotected } from 'nest-keycloak-connect';
import { AddShowWatchlistDto } from './dto/request/add-watchlist.dto';
import { CreateShowCommentDto } from './dto/request/create-comment.dto';
import { UpdateShowCommentDto } from './dto/request/update-comment.dto';
import { ShowCommentResponseDto } from './dto/response/comment.dto';
import { ShowDetailWrapperResponseDto } from './dto/response/show-detail-wrapper-response.dto';
import { ShowsService } from './shows.service';

@Controller('shows')
@ApiTags('shows')
@ApiInternalServerErrorResponse({
  description: 'There was an error processing this request.',
})
@ApiBadRequestResponse({
  description: 'Bad request.',
})
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Post('watchlist')
  @Unprotected()
  @ApiOkResponse({
    description: 'Show added to the watchlist successfully.',
  })
  @ApiOperation({
    summary: 'Add a watchlist to the watchlist',
    description: 'Adds a show to the watchlist.',
  })
  addShowWatchlist(
    @Body() createShowCommentDto: AddShowWatchlistDto,
  ): Promise<Show> {
    return this.showsService.addShowWatchlist(createShowCommentDto);
  }

  @Delete('watchlist/:id')
  @Unprotected()
  @ApiOkResponse({
    description: 'Show deleted from the watchlist successfully.',
  })
  @ApiOperation({
    summary: 'Deletes a show from the watchlist',
    description: 'Deletes a show from the user watchlist.',
  })
  removeShowWatchlist(@Param('id') id: string): Promise<any> {
    try {
      return this.showsService.removeShowWatchlist(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('watchlist/:userId')
  @Unprotected()
  @ApiOkResponse({
    description: 'Show watchlist successfully found.',
    type: [ShowDetailWrapperResponseDto],
  })
  @ApiOperation({
    summary: 'Returns all shows on the watchlist',
    description: 'Returns all shows on the user watchlist.',
  })
  getShowWatchlist(
    @Param('userId') userId: string,
  ): Promise<ShowDetailWrapperResponseDto[]> {
    return this.showsService.getShowWatchlist(userId);
  }

  @Get('recommendations/:userId')
  @Unprotected()
  @ApiOkResponse({
    description: 'Show recommendations successfully found.',
  })
  @ApiOperation({
    summary: 'Returns all show recommendations',
    description: 'Returns all show recommendations based on user watchlist.',
  })
  getShowRecommendations(@Param('userId') userId: string) {
    return this.showsService.getShowRecommendations(userId);
  }

  @Post('comments')
  @Unprotected()
  @ApiOkResponse({
    description: 'Show comment successfully created.',
    type: [ShowCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Create show comment',
    description: 'Creates a user show comment.',
  })
  create(
    @Body() createShowCommentDto: CreateShowCommentDto,
  ): Promise<ShowComment> {
    return this.showsService.createShowComment(createShowCommentDto);
  }

  @Get('comments')
  @Unprotected()
  @ApiOkResponse({
    description: 'Show comment successfully found.',
    type: [ShowCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Returns all show comments',
    description: 'Returns all shows comments for a specific show.',
  })
  findAll(
    @Query('userId') userId: string,
    @Query('showId') showId: string,
    @Query('season') season: string,
    @Query('episode') episode: string,
  ) {
    return this.showsService.findAllShowComments(
      userId,
      +showId,
      +season,
      +episode,
    );
  }

  @Patch('comments/:id')
  @ApiOkResponse({
    description: 'Show comment successfully updated.',
    type: [ShowCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Updates show comment',
    description: 'Updates a specific show comment.',
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized correctly.',
  })
  @Unprotected()
  update(
    @Param('id') id: string,
    @Body() updateShowDto: UpdateShowCommentDto,
  ): Promise<ShowComment> {
    return this.showsService.updateShowComment(+id, updateShowDto);
  }

  @Delete('comments/:id')
  @ApiOkResponse({
    description: 'Show comment successfully deleted.',
    type: [ShowCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Deletes a show comment',
    description: 'Deletes a specific show comment.',
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized correctly.',
  })
  @Unprotected()
  remove(@Param('id') id: string): Promise<ShowComment> {
    return this.showsService.removeShowComment(+id);
  }
}
