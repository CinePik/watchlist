import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'warn', emit: 'event' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on('info' as never, (e) => this.logger.log(e));
    this.$on('warn' as never, (e) => this.logger.log(e));
    this.$on('error' as never, (e) => this.logger.log(e));
    this.$on('query' as never, (e: Prisma.QueryEvent) => {
      this.logger.log(
        `Query: ${e.query} - Params: ${e.params} - Duration: ${e.duration}ms`,
      );
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
