import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { ApiKeysController } from './apiKeys/apiKeys.controller';
import { ApiKeysService } from './apiKeys/apiKeys.service';
import { RequestTimeMiddleware } from './middleware/requestTime';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        connection: {
          host: process.env.DB_HOST!,
          port: parseInt(process.env.DB_PORT!),
          user: process.env.DB_USER!,
          password: process.env.DB_PASS!,
          database: process.env.DB_NAME!,
        },
      },
    }),
  ],
  controllers: [ApiKeysController],
  providers: [ApiKeysService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestTimeMiddleware).forRoutes('*');
  }
}
