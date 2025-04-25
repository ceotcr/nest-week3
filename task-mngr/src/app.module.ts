import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { createAuthMiddleware } from './common/middlewares/auth.middleware';
import { TasksController } from './tasks/tasks.controller';
import { DataSource } from 'typeorm';
import { loggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "data/db.sqlite",
      synchronize: true,
      entities: [User, Task],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TasksModule,
    UsersModule,
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(createAuthMiddleware(this.dataSource)).forRoutes(TasksController).apply(loggerMiddleware).forRoutes("*");
  }
}
