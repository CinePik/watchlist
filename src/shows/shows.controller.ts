import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ShowComment } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';
import { CreateShowCommentDto } from './dto/request/create-comment.dto';
import { UpdateShowCommentDto } from './dto/request/update-comment.dto';
import { UpdateShowWatchedDto } from './dto/request/update-watched.dto';
import { ShowCommentResponseDto } from './dto/response/comment.dto';
import { ShowsService as ShowsService } from './shows.service';

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

  @Post()
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
    return this.showsService.create(createShowCommentDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Show comment successfully found.',
    type: [ShowCommentResponseDto],
  })
  @ApiOperation({
    summary: 'Returns all show comments',
    description: 'Returns all shows comments for a specific show.',
  })
  findAll() {
    return this.showsService.findAll();
  }

  @Patch(':id')
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
  @Roles({ roles: ['realm:app-admin'] })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateShowDto: UpdateShowCommentDto,
  ): Promise<ShowComment> {
    return this.showsService.update(+id, updateShowDto);
  }

  @Patch('watched/:id')
  @ApiOkResponse({
    description: 'Show watched successfully updated.',
  })
  @ApiOperation({
    summary: 'Updates show watched status',
    description: 'Updates show watched status for a specific show.',
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized correctly.',
  })
  @Roles({ roles: ['realm:app-admin'] })
  @ApiBearerAuth()
  updateWatched(
    @Param('id') id: string,
    @Body() updateShowWatchedDto: UpdateShowWatchedDto,
  ): Promise<any> {
    return this.showsService.updateWatched(+id, updateShowWatchedDto);
  }

  @Delete(':id')
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
  @ApiBearerAuth()
  @Roles({ roles: ['realm:app-admin'] })
  remove(@Param('id') id: string): Promise<ShowComment> {
    return this.showsService.remove(+id);
  }
}
