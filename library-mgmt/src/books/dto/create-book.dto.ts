import { IsNotEmpty, IsString, IsInt, IsISBN } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsISBN(13, { message: 'ISBN must be a valid 13-digit ISBN number' })
    isbn: string;

    @IsNotEmpty()
    @IsInt()
    quantity: number;
}

