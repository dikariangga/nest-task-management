import { Task } from "./tasks.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<any> {
    const { title, description } = createTaskDto;
    let response = {};

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    response = {
      statusCode: 201,
      message: "Task has been successfully created",
      data: task,
    };

    return response;
  }
}
