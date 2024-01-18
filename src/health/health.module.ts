import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';
import { HealthController } from './health.controller';
import { ManualHealthIndicator } from './manual.health';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [ManualHealthIndicator, PrismaService],
})
export class HealthModule {}
