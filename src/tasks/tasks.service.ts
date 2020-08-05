import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./tasks.entity";
import { response } from "express";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase())
  //     );
  //   }

  //   return tasks;
  // }

  async getTaskById(id: number): Promise<any> {
    // const found: Task = await this.taskRepository.findOne(id);
    const found = await this.taskRepository.findOne(id);
    let response = {};

    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' not found!`);
    } else {
      response = {
        statusCode: 200,
        message: "Get task successfully",
        data: found,
      };
    }

    return response;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<any> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<any> {
    const result = await this.taskRepository.delete(id);
    let response = {};

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${id}' not found!`);
    } else {
      response = {
        statusCode: 200,
        message: "Task has been successfully deleted",
      };
    }

    return response;
  }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;

  //   return task;
  // }
}
