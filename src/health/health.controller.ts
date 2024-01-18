import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { Unprotected } from 'nest-keycloak-connect';
import { PrismaService } from 'src/prisma/prisma.service';
import { ManualHealthIndicator } from './manual.health';

@Controller('health')
@ApiTags('health')
@Unprotected()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private manualHealthIndicator: ManualHealthIndicator,
    private prisma: PrismaHealthIndicator,
    private prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  @Get('live')
  @HealthCheck()
  checkLiveness() {
    return this.health.check([
      () => this.manualHealthIndicator.isHealthyCheck('manual'),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  checkReadiness() {
    return this.health.check([
      () => this.http.pingCheck('google', 'https://google.com'),
      // () => this.prisma.pingCheck('prisma', this.prismaService),
      // () => this.http.pingCheck('rapidapi', 'https://rapidapi.com', {}),
      // () =>
      //   this.http.pingCheck(
      //     'keycloak',
      //     `${this.configService.get('KEYCLOAK_BASE_URL')}/health/live`,
      //   ),
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.9 }), // if more than 90% of disk space is used
      () => this.memory.checkHeap('memory_heap', 256 * 1024 * 1024), // if more than 256MiB
      () => this.manualHealthIndicator.isHealthyCheck('manual'),
    ]);
  }

  @Post('toggle')
  @HttpCode(HttpStatus.NO_CONTENT)
  toggleHealth() {
    this.manualHealthIndicator.toggleHealth();
  }
}
