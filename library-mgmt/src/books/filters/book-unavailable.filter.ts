import { Catch, ExceptionFilter } from "@nestjs/common";
import { BookUnavailableException } from "../exceptions/book-unavailable.exception";

@Catch(BookUnavailableException)
export class BookUnavailableFilter implements ExceptionFilter {
    catch(exception: BookUnavailableException, response: any) {
        response.status(exception.getStatus()).json({
            statusCode: exception.getStatus(),
            message: exception.message,
        });
    }
}