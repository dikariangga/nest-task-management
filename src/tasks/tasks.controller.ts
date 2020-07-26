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
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): any {
    if (Object.keys(filterDto).length) {
      let data = this.tasksService.getTaskWithFilter(filterDto);

      let msg = "Get task successfully";
      if (data.length < 1) {
        msg = "The data you are looking for is not found or doesn't exist!";
      }

      let response = {
        statusCode: 200,
        message: msg,
        data: data,
      };

      return response;
    } else {
      let data = this.tasksService.getAllTasks();

      let msg = "Get task successfully";
      if (data.length < 1) {
        msg = "Data in the database is empty!";
      }

      let response = {
        statusCode: 200,
        message: msg,
        data: data,
      };

      return response;
    }
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): any {
    let data = this.tasksService.getTaskById(id);

    let response = {
      statusCode: 200,
      message: "Get task successfully",
      data: data,
    };

    return response;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): any {
    let data = this.tasksService.createTask(createTaskDto);

    let response = {
      statusCode: 200,
      message: "Create task successfully",
      data: data,
    };

    return response;
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): any {
    this.tasksService.deleteTask(id);

    let response = {
      statusCode: 200,
      message: "Delete task successfully",
    };

    return response;
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus
  ): any {
    let data = this.tasksService.updateTaskStatus(id, status);

    let response = {
      statusCode: 200,
      message: "Update task status successfully",
      data: data,
    };

    return response;
  }
}
