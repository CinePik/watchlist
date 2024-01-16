import { ApiProperty } from '@nestjs/swagger';

export class ShowCommentResponseDto {
  @ApiProperty({
    description: 'Comment identifier.',
  })
  id: number;

  @ApiProperty({
    description: 'User identifier.',
  })
  userId: number;

  @ApiProperty({
    description: 'Show identifier.',
  })
  showId: number;

  @ApiProperty({
    description: 'Show episode.',
  })
  episode: number;

  @ApiProperty({
    description: 'Show season.',
  })
  season: number;

  @ApiProperty({
    description: 'Show rating.',
  })
  rating: number;

  @ApiProperty({
    description: 'User comment.',
  })
  comment: string;

  @ApiProperty({
    description: 'Has the user watched the show.',
  })
  watched: boolean;

  @ApiProperty({
    description: 'Show creation date.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Show update date.',
  })
  updatedAt: Date;
}
