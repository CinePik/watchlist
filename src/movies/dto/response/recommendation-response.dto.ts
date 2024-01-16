import { ApiProperty } from '@nestjs/swagger';

export class MovieRecommendationResponseDto {
  @ApiProperty({
    description: 'Movie identifier.',
  })
  id: number;
  @ApiProperty({
    description: 'Url for the backdrop image.',
  })
  backdrop_path: string;
  @ApiProperty({
    description: 'List of genres that best describe the content.',
  })
  genres: string[];
  @ApiProperty({
    description: 'Title in the original language.',
  })
  original_title: string;
  @ApiProperty({
    description: 'Short movie description.',
  })
  overview: string;
  @ApiProperty({
    description: 'Url for the poster image.',
  })
  poster_path: string;
  @ApiProperty({
    description: 'Movie release date.',
  })
  release_date?: Date;
  @ApiProperty({
    description: 'Movie title.',
  })
  title: string;
  @ApiProperty({
    description: 'Movie vote average.',
  })
  vote_average: number;
  @ApiProperty({
    description: 'Recommendations match score.',
  })
  match_score: number;
}
