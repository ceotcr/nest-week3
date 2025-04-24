import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn() id: number;
    @Column() title: string;
    @Column() description: string;
    @Column({ default: 'OPEN' }) status: 'OPEN' | 'DONE';
    @ManyToOne(() => User, user => user.id)
    createdBy: User;
}