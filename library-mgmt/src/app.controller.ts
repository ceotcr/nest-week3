import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BorrowService } from './borrow/borrow.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly borrowService: BorrowService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('return/:borrowId')
  async returnBook(@Param('borrowId', ParseIntPipe) borrowId: number) {
    return this.borrowService.returnBook(borrowId);
  }

  @Get('reports/overdue')
  async getOverdueBorrows() {
    return this.borrowService.getOverdueBorrows();
  }
}
