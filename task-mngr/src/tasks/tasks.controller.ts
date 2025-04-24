import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { StatusValidationPipe } from './pipes/status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body(ValidationPipe, StatusValidationPipe) createTaskDto: CreateTaskDto, @Req() req: any) {
    return this.tasksService.create(req.user.id, createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('mine')
  findByUserId(@Req() req: any) {
    return this.tasksService.findByUserId(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe, StatusValidationPipe) updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @UseGuards(new RolesGuard('ADMIN'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
