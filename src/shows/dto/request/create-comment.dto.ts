import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateShowCommentDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User identifier.',
  })
  userId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Show identifier.',
  })
  showId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Show episode.',
  })
  episode: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Show season.',
  })
  season: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Show rating.',
  })
  rating: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User comment.',
  })
  comment: string;
}
