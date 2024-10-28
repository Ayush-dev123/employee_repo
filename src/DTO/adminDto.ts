// src/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class createAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  status: string;

}
