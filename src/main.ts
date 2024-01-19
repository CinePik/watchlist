import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
  });
  const port = process.env.NODE_PORT;
  const version = process.env.npm_package_version;

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('CinePik Watchlist API')
    .setDescription('The CinePik Watchlist microservice.')
    .setVersion(version)
    .setBasePath('/watchlist')
    .addBearerAuth()
    .addServer(`http://localhost:${port}`)
    .addServer('http://cinepik.fun/watchlist')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('openapi', app, document);

  // Enable DTO validation
  app.useGlobalPipes(new ValidationPipe());

  console.log(`App version ${version}`);
  console.log(`Listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
