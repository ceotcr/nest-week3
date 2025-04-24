import { BadRequestException, PipeTransform, Injectable } from "@nestjs/common";

@Injectable()
export class QuantityValidationPipe implements PipeTransform {
    transform(value: any) {
        if (!value.quantity || typeof value.quantity !== 'number' || value.quantity < 0) {
            throw new BadRequestException('Quantity must be a non-negative number');
        }
        return value;
    }
}