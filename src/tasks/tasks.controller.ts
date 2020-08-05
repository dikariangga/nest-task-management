import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { Task } from "./tasks.entity";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): any {
  //   if (Object.keys(filterDto).length) {
  //     let data = this.tasksService.getTaskWithFilter(filterDto);

  //     let msg = "Get task successfully";
  //     if (data.length < 1) {
  //       msg = "The data you are looking for is not found or doesn't exist!";
  //     }

  //     let response = {
  //       statusCode: 200,
  //       message: msg,
  //       data: data,
  //     };

  //     return response;
  //   } else {
  //     let data = this.tasksService.getAllTasks();

  //     let msg = "Get task successfully";
  //     if (data.length < 1) {
  //       msg = "Data in the database is empty!";
  //     }

  //     let response = {
  //       statusCode: 200,
  //       message: msg,
  //       data: data,
  //     };

  //     return response;
  //   }
  // }

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<any> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return this.tasksService.deleteTask(id);
  }

  // @Patch("/:id/status")
  // updateTaskStatus(
  //   @Param("id") id: string,
  //   @Body("status", TaskStatusValidationPipe) status: TaskStatus
  // ): any {
  //   let data = this.tasksService.updateTaskStatus(id, status);

  //   let response = {
  //     statusCode: 200,
  //     message: "Update task status successfully",
  //     data: data,
  //   };

  //   return response;
  // }
}
