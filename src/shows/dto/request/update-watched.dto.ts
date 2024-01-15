import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateShowWatchedDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Show identifier.',
  })
  movieId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User identifier.',
  })
  userId: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Has the user watched the show.',
  })
  watched: boolean;
}
