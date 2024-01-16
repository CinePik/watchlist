import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateMovieWatchedDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Has the user watched the movie.',
  })
  watched: boolean;
}
