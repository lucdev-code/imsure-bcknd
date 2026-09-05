import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { InformationModule } from './information/information.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [NewsModule, PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InformationModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 4,
    }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
