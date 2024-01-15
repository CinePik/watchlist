import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class UpdateShowCommentDto {
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

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  @ApiProperty({
    description: 'Show rating.',
  })
  rating: number;

  @IsAlphanumeric()
  @IsOptional()
  @ApiProperty({
    description: 'User comment.',
  })
  comment: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Has the user watched the show.',
  })
  watched: boolean;
}
