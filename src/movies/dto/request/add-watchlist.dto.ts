import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddMovieWatchlistDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'User identifier.',
  })
  userId: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'TMDB movie identifier.',
  })
  tmdbMovieId: number;
}
