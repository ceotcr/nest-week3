import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class StatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = ['OPEN', 'DONE'];

    transform(value: any, metadata: ArgumentMetadata) {
        if (!this.allowedStatuses.includes(value.status)) {
            throw new BadRequestException(`"${value.status}" is an invalid status`);
        }
        return value;
    }
}