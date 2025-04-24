import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from './entities/borrow.entity';
import { Book } from 'src/books/entities/book.entity';
import { Member } from 'src/members/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, Book, Member])],
  controllers: [BorrowController],
  providers: [BorrowService],
  exports: [BorrowService],
})
export class BorrowModule { }
