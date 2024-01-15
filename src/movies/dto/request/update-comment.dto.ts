import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateMovieCommentDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  @ApiProperty({
    description: 'Movie rating.',
  })
  rating: number;

  @IsOptional()
  @ApiProperty({
    description: 'User comment.',
  })
  comment: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Has the user watched the movie.',
  })
  watched: boolean;
}
