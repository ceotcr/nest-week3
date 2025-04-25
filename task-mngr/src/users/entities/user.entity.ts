import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn() id: number;
    @Column() username: string;
    @Column() password: string;
    @Column({ type: 'text', default: 'USER' }) role: 'USER' | 'ADMIN';
}