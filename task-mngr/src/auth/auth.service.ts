import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    async login({ username, password }: { username: string; password: string }) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}
