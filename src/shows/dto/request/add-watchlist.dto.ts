import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddShowWatchlistDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Show identifier.',
  })
  userId: string;

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
}
