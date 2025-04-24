import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private role: 'ADMIN' | 'USER') { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user?.role === this.role;
    }
}
