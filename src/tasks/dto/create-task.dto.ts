import { IsNotEmpty, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @MinLength(10)
  description: string;
}
