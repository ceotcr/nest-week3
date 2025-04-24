import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, IsNull } from 'typeorm';
import { Borrow } from './entities/borrow.entity';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { Member } from 'src/members/entities/member.entity';
import { Book } from 'src/books/entities/book.entity';
import { BookUnavailableException } from 'src/books/exceptions/book-unavailable.exception';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,

    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) { }

  async create(createBorrowDto: CreateBorrowDto): Promise<Borrow> {
    const book = await this.bookRepository.findOneBy({ id: createBorrowDto.bookId });
    const member = await this.memberRepository.findOneBy({ id: createBorrowDto.memberId });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    if (book.quantity <= 0) {
      throw new BookUnavailableException(book.id);
    }
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const borrow = this.borrowRepository.create({
      book,
      member,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    book.quantity -= 1;
    await this.bookRepository.save(book);

    return this.borrowRepository.save(borrow);
  }

  async findAll(): Promise<Borrow[]> {
    return this.borrowRepository.find({ relations: ['book', 'member'] });
  }

  async findOne(id: number): Promise<Borrow> {
    const borrow = await this.borrowRepository.findOne({
      where: { id },
      relations: ['book', 'member'],
    });

    if (!borrow) {
      throw new NotFoundException(`Borrow record with ID ${id} not found`);
    }

    return borrow;
  }

  async update(id: number, updateBorrowDto: UpdateBorrowDto): Promise<Borrow> {
    const borrow = await this.borrowRepository.preload({
      id,
      ...updateBorrowDto,
    });

    if (!borrow) {
      throw new NotFoundException(`Borrow record with ID ${id} not found`);
    }

    return this.borrowRepository.save(borrow);
  }

  async remove(id: number): Promise<void> {
    const borrow = await this.findOne(id);
    await this.borrowRepository.remove(borrow);
  }

  async returnBook(borrowId: number): Promise<Borrow> {
    const borrow = await this.findOne(borrowId);

    if (borrow.returnDate) {
      throw new BadRequestException('Book already returned');
    }

    borrow.returnDate = new Date();

    borrow.book.quantity += 1;
    await this.bookRepository.save(borrow.book);

    return this.borrowRepository.save(borrow);
  }

  async getOverdueBorrows(): Promise<Borrow[]> {
    const today = new Date();
    return this.borrowRepository.find({
      where: {
        dueDate: LessThan(today),
        returnDate: IsNull(),
      },
      relations: ['book', 'member'],
    });
  }
}
