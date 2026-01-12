import { IsEmail, IsNotEmpty } from "class-validator";

export class QueryUsersEmail {
  @IsEmail()
  @IsNotEmpty()
  email: string
}