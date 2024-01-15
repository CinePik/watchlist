import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateMovieWatchedDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Movie identifier.',
  })
  movieId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User identifier.',
  })
  userId: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Has the user watched the movie.',
  })
  watched: boolean;
}
