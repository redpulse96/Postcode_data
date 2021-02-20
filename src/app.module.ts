import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';
import { DatabaseModule } from './modules/database/database.module';
import { DotenvModule } from './modules/dotenv/dotenv.module';
import { DotenvService } from './modules/dotenv/dotenv.service';
import { PostCodesModule } from './modules/post-code/post-code.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { UtilModule } from './modules/util/util.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'public',
    }),
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
          entities: [join(__dirname, '/**/*.entity.{d.js,d.ts,js,ts}')],
          synchronize: dotenvService.get('NODE_ENV') == 'development',
          logging: dotenvService.get('NODE_ENV') == 'development',
          logger: 'file',
        } as any),
      inject: [DotenvService],
    }),
    // GraphQLModule.forRootAsync({
    //   useFactory: async (dotenvService: DotenvService) => ({
    //     debug: dotenvService.get('NODE_ENV') == 'development',
    //     playground: dotenvService.get('NODE_ENV') == 'development',
    //     autoSchemaFile: true,
    //     sortSchema: true,
    //     context: ({ req }) => ({ req }),
    //   }),
    //   inject: [DotenvService],
    // }),
    DotenvModule,
    // AuthModule,
    // EmailModule,
    ConsoleModule,
    // NotificationModule,
    forwardRef(() => UtilModule),
    forwardRef(() => PostCodesModule),
    DatabaseModule,
    SchedulerModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer.apply(SessionMiddleware).forRoutes('*');
    // consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
