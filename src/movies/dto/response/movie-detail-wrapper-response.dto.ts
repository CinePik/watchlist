import { ApiProperty } from '@nestjs/swagger';
import { MovieDetailResponseDto } from './movie-detail-response.dto';
import { SimilarMovieDetailResponseDto } from './similar-movie-response.dto';

export class MovieDetailWrapperResponseDto {
  @ApiProperty({
    description: 'Detailed movie information.',
  })
  movie: MovieDetailResponseDto;
  @ApiProperty({
    description: 'Similar movies.',
  })
  similarMovies: SimilarMovieDetailResponseDto[];
}
