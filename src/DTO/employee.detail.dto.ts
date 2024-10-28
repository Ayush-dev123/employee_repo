// src/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class empDetail {

    @IsNotEmpty()
    userId: number;

    @IsEmail()
    @IsNotEmpty()
    department: string;

    @IsString()
    @IsNotEmpty()
    salary: number;

    @IsString()
    @IsNotEmpty()
    joining_date: Date;

    @IsOptional()
    updated_date?: Date;

}
