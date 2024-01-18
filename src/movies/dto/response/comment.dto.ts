import { ApiProperty } from '@nestjs/swagger';
import {} from 'class-validator';

export class MovieCommentResponseDto {
  @ApiProperty({
    description: 'Comment identifier.',
  })
  id: number;

  @ApiProperty({
    description: 'User identifier.',
  })
  userId: string;

  @ApiProperty({
    description: 'Movie identifier.',
  })
  movieId: number;

  @ApiProperty({
    description: 'Movie rating.',
  })
  rating: number;

  @ApiProperty({
    description: 'User comment.',
  })
  comment: string;

  @ApiProperty({
    description: 'Movie creation date.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Movie update date.',
  })
  updatedAt: Date;
}
