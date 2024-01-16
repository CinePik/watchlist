import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateShowCommentDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  @ApiProperty({
    description: 'Show rating.',
  })
  rating: number;

  @IsOptional()
  @ApiProperty({
    description: 'User comment.',
  })
  comment: string;
}
