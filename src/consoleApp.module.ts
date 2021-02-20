import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { DatabaseModule } from './modules/database/database.module';
import { DotenvModule } from './modules/dotenv/dotenv.module';
import { DotenvService } from './modules/dotenv/dotenv.service';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { UtilModule } from './modules/util/util.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DotenvModule],
      useFactory: async (dotenvService: DotenvService) =>
        ({
          type: 'mysql',
          host: dotenvService.get('DB_HOST'),
          port: parseInt(dotenvService.get('DB_PORT'), 10),
          username: dotenvService.get('DB_USER'),
          password: dotenvService.get('DB_PASSWORD'),
          database: dotenvService.get('DB_NAME'),
          entities: ['dist/**/**.entity{.ts,.js}'], // __dirname + '/modules/**/*.entity{.ts,.js}'],
          synchronize: false, // dotenvService.get('NODE_ENV') === 'development',
          logging: dotenvService.get('NODE_ENV') === 'development',
          logger: 'file',
        } as any),
      inject: [DotenvService],
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (dotenvService: DotenvService) => ({
        debug: dotenvService.get('NODE_ENV') === 'development',
        playground: dotenvService.get('NODE_ENV') === 'development',
        autoSchemaFile: true,
        context: ({ req }) => ({ req }),
      }),
      inject: [DotenvService],
    }),
    DotenvModule,
    // AuthModule,
    // EmailModule,
    ConsoleModule,
    // NotificationModule,
    forwardRef(() => UtilModule),
    // forwardRef(() => UserModule),
    DatabaseModule,
    SchedulerModule,
  ],
  providers: [],
})
export class ConsoleAppModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer.apply(SessionMiddleware).forRoutes('*');
    // consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
