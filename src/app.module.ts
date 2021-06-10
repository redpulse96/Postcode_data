import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';
import { authenticationModule } from './modules/authentication/authentication.module';
import { bid_namesModule } from './modules/bid_names/bid_names.module';
import { DatabaseModule } from './modules/database/database.module';
import { DotenvModule } from './modules/dotenv/dotenv.module';
import { DotenvService } from './modules/dotenv/dotenv.service';
import { EORA_lm1Module } from './modules/EORA_lm1/EORA_lm1.module';
import { EORA_lm2Module } from './modules/EORA_lm2/EORA_lm2.module';
import { EORA_lm3Module } from './modules/EORA_lm3/EORA_lm3.module';
import { EORA_usersModule } from './modules/EORA_users/EORA_users.module';
import { EORA_venuesModule } from './modules/EORA_venues/EORA_venues.module';
import { EROA_accountsModule } from './modules/EROA_accounts/EROA_accounts.module';
import { lepsModule } from './modules/leps/leps.module';
import { local_authoritiesModule } from './modules/local_authorities/local_authorities.module';
import { PostCodesModule } from './modules/post-code/post-code.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { UtilModule } from './modules/util/util.module';
import { wardsModule } from './modules/wards/wards.module';

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
    forwardRef(() => EORA_lm1Module),
    forwardRef(() => EORA_lm2Module),
    forwardRef(() => EORA_lm3Module),
    forwardRef(() => EORA_usersModule),
    forwardRef(() => EROA_accountsModule),
    forwardRef(() => bid_namesModule),
    forwardRef(() => local_authoritiesModule),
    forwardRef(() => lepsModule),
    forwardRef(() => wardsModule),
    forwardRef(() => authenticationModule),
    forwardRef(() => EORA_venuesModule),
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
