import { Book } from 'src/books/entities/book.entity';
import { Member } from 'src/members/entities/member.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Borrow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Member, (member) => member.borrows)
    member: Member;

    @ManyToOne(() => Book, (book) => book.borrows)
    book: Book;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    borrowDate: Date;

    @Column({ type: 'datetime' })
    dueDate: Date;

    @Column({ type: 'datetime', nullable: true })
    returnDate?: Date;
}
