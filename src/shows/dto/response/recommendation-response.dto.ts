import { ApiProperty } from '@nestjs/swagger';

export class ShowRecommendationResponseDto {
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
  original_title: string;
  @ApiProperty({
    description: 'Short show description.',
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
    description: 'Recommendations match score.',
  })
  match_score: number;
}
