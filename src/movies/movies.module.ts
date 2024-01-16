import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [KeycloakModule, HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
})
export class MoviesModule {}
