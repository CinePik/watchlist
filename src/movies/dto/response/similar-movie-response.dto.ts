import { ApiProperty } from '@nestjs/swagger';

export class SimilarMovieDetailResponseDto {
  @ApiProperty({
    description: 'Movie identifier.',
  })
  id: number;
  @ApiProperty({
    description: 'Url for the poster image.',
  })
  poster_path: string;
  @ApiProperty({
    description: 'Movie title.',
  })
  title: string;
  @ApiProperty({
    description: 'Url for the backdrop image.',
  })
  backdrop_path: string;
}
