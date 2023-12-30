import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  info(): string {
    return 'CinePik watchlist v' + process.env.npm_package_version;
  }
}
