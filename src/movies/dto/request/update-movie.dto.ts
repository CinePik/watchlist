import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateMovieDto extends PartialType(CreateCommentDto) {}
