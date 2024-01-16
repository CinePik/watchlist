import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateMovieCommentDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User identifier.',
  })
  userId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Movie identifier.',
  })
  movieId: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Movie rating.',
  })
  rating: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User comment.',
  })
  comment: string;
}
