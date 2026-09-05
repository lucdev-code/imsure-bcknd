import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit {
  constructor(configService: ConfigService) {
    const connectionString =
      configService.get<string>('DATABASE_URL');

    if (!connectionString) {
      throw new Error(
        'DATABASE_URL no está definida',
      );
    }

    console.log('DATABASE_URL existe:', !!connectionString);

    try {
      const parsedUrl = new URL(connectionString);

      console.log('DATABASE HOST:', parsedUrl.hostname);
      console.log('DATABASE PORT:', parsedUrl.port || '5432');
      console.log('DATABASE NAME:', parsedUrl.pathname);
    } catch {
      throw new Error('DATABASE_URL tiene un formato inválido');
    }

    const adapter = new PrismaPg({
      connectionString,
    });

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}