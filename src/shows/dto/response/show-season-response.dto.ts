import { ApiProperty } from '@nestjs/swagger';
import { ShowEpisodeResponseDto } from './show-episode-response.dto';

export class ShowSeasonsResponseDto {
  @ApiProperty({
    description: 'Season number.',
  })
  season: number;
  @ApiProperty({
    description: 'Season episodes.',
  })
  episodes: ShowEpisodeResponseDto[];
}
