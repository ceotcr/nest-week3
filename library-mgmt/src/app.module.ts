import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { BorrowModule } from './borrow/borrow.module';
import { Book } from './books/entities/book.entity';
import { Member } from './members/entities/member.entity';
import { Borrow } from './borrow/entities/borrow.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "data/db.sqlite",
      synchronize: true,
      entities: [Book, Member, Borrow],
      logging: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    BooksModule,
    MembersModule,
    BorrowModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
