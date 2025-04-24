import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>, @InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async create(userId: number, createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    task.createdBy = this.userRepository.create({ id: userId });
    return this.taskRepository.save(task);
  }

  findAll() {
    return this.taskRepository.find({ relations: { createdBy: true } });
  }

  findOne(id: number) {
    return this.taskRepository.findOne({ where: { id }, relations: { createdBy: true } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.preload({ id, ...updateTaskDto });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.taskRepository.remove(task);
  }

  async findByUserId(userId: number) {
    return this.taskRepository.find({ where: { createdBy: { id: userId } }, relations: { createdBy: true } });
  }
}
