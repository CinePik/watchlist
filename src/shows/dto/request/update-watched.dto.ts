import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateShowWatchedDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User identifier.',
  })
  userId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Show identifier.',
  })
  showId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Show episode.',
  })
  episode: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Show season.',
  })
  season: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Has the user watched the show.',
  })
  watched: boolean;
}
