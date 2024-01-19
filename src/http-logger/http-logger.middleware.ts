import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);

  use(req: any, res: any, next: () => void) {
    // Assign a UUID to the request
    req['traceId'] = uuidv4();

    // Start the timer
    const start = Date.now();

    // Log request
    this.logger.log(
      `[${req['traceId']}] Req: ${req.method} ${req.originalUrl}`,
    );

    // Log response
    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(
        `[${req['traceId']}] Res: ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`,
      );
    });

    next();
  }
}
