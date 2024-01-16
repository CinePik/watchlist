import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';

@Module({
  imports: [KeycloakModule, HttpModule],
  controllers: [ShowsController],
  providers: [ShowsService, PrismaService],
})
export class ShowsModule {}
