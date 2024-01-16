import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddMovieWatchlistDto {
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
}
