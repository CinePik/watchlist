import { ApiProperty } from '@nestjs/swagger';
import { ShowSeasonsResponseDto } from 'src/shows/dto/response/show-season-response.dto';
import { ShowDetailResponseDto } from './show-detail-response.dto';

export class ShowDetailWrapperResponseDto {
  @ApiProperty({
    description: 'Detailed show information.',
  })
  show: ShowDetailResponseDto;
  @ApiProperty({
    description: 'Show seasons.',
  })
  seasons: ShowSeasonsResponseDto[];
  @ApiProperty({
    description: 'Show episode.',
  })
  episode: number;

  @ApiProperty({
    description: 'Show season.',
  })
  season: number;
}
