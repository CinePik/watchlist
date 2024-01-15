import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KeycloakModule } from './keycloak/keycloak.module';
import { MoviesModule } from './movies/movies.module';
import { ShowsModule } from './shows/shows.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    KeycloakModule,
    MoviesModule,
    ShowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
