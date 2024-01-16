import { Module } from '@nestjs/common';
import { ShowsController } from './shows.controller';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShowsService } from './shows.service';

@Module({
  imports: [KeycloakModule],
  controllers: [ShowsController],
  providers: [ShowsService, PrismaService],
})
export class ShowsModule {}
