import { ApiProperty } from '@nestjs/swagger';
import { SourceResponseDto } from './source-response.dto';

export class MovieDetailResponseDto {
  @ApiProperty({
    description: 'Cinepik movie identifier.',
  })
  id: number;
  @ApiProperty({
    description: 'TMDB movie identifier.',
  })
  tmdbId: number;
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
    description: 'Short content description.',
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
    description: 'Movie vote count.',
  })
  vote_count: number;
  @ApiProperty({
    description: 'Movie Youtube trailer.',
  })
  youtube_trailer: string;
  @ApiProperty({
    description: 'Movie sources.',
  })
  sources: SourceResponseDto[];
}
