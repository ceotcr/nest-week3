import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(Member) private memberRepository: Repository<Member>) { }
  create(createMemberDto: CreateMemberDto) {
    return this.memberRepository.save(createMemberDto);
  }

  findAll() {
    return this.memberRepository.find({ relations: ['borrows'] });
  }

  findOne(id: number) {
    return this.memberRepository.findOne({ where: { id }, relations: ['borrows'] });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.memberRepository.preload({ id, ...updateMemberDto });
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return this.memberRepository.save(member);
  }

  async remove(id: number) {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return this.memberRepository.remove(member);
  }
}
