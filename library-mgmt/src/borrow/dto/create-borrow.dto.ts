import { IsNotEmpty, IsInt } from 'class-validator';
export class CreateBorrowDto {
    @IsNotEmpty()
    @IsInt()
    bookId: number;

    @IsNotEmpty()
    @IsInt()
    memberId: number;
}
