import { Borrow } from "src/borrow/entities/borrow.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    isbn: string;

    @Column()
    quantity: number;

    @OneToMany(() => Borrow, (borrow) => borrow.book)
    borrows: Borrow[];
}
