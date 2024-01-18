import { ApiProperty } from '@nestjs/swagger';
import { SourceResponseDto } from 'src/movies/dto/response/source-response.dto';

export class ShowEpisodeResponseDto {
  @ApiProperty({
    description: 'Episode identifier.',
  })
  id: number;
  @ApiProperty({
    description: 'Show identifier.',
  })
  show_id: number;
  @ApiProperty({
    description: 'Episode number.',
  })
  episode_number: number;
  @ApiProperty({
    description: 'Episode season number.',
  })
  season_number: number;
  @ApiProperty({
    description: 'Url for the thumbnail image.',
  })
  thumbnail_path: string;
  @ApiProperty({
    description: 'Episode first aired date.',
  })
  first_aired?: Date;
  @ApiProperty({
    description: 'Episode title.',
  })
  title: string;
  @ApiProperty({
    description: 'Whether the episode is currently available.',
  })
  availability: boolean;
  @ApiProperty({
    description: 'Show sources.',
  })
  sources: SourceResponseDto[];
}
