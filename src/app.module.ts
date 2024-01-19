import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { HttpLoggerMiddleware } from './http-logger/http-logger.middleware';
import { KeycloakModule } from './keycloak/keycloak.module';
import { MetricsModule } from './metrics/metrics.module';
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
    HealthModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
