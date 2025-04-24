import { BadRequestException, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('login')
  login(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new BadRequestException('Invalid authorization header format');
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    return this.authService.login({ username, password });
  }
}