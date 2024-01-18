import { ApiProperty } from '@nestjs/swagger';
import { SourceResponseDto } from 'src/movies/dto/response/source-response.dto';

export class ShowDetailResponseDto {
  @ApiProperty({
    description: 'Show identifier.',
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
    description: 'Short content description.',
  })
  overview: string;
  @ApiProperty({
    description: 'Url for the poster image.',
  })
  poster_path: string;
  @ApiProperty({
    description: 'Show first aired date.',
  })
  first_aired?: Date;
  @ApiProperty({
    description: 'Show title.',
  })
  title: string;
  @ApiProperty({
    description: 'Show vote average.',
  })
  vote_average: number;
  @ApiProperty({
    description: 'Show vote count.',
  })
  vote_count: number;
  @ApiProperty({
    description: 'Show Youtube trailer.',
  })
  youtube_trailer: string;
  @ApiProperty({
    description: 'Show sources.',
  })
  sources: SourceResponseDto[];
}
