import { ApiProperty } from '@nestjs/swagger';

export class PlatformResponseDto {
  @ApiProperty({
    description: 'Android url.',
  })
  android?: string;
  @ApiProperty({
    description: 'Android tv url.',
  })
  android_tv?: string;
  @ApiProperty({
    description: 'Ios url.',
  })
  ios: string;
  @ApiProperty({
    description: 'Web url.',
  })
  web: string;
}
