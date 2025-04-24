import { HttpException, HttpStatus } from '@nestjs/common';

export class BookUnavailableException extends HttpException {
    constructor(bookId: number) {
        super(`Book with ID ${bookId} is not available for borrowing.`, HttpStatus.BAD_REQUEST);
    }
}
