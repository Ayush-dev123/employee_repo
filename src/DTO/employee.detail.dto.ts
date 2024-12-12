// src/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class empDetail {


    userId: number;


    @IsNotEmpty()
    department: string;


    @IsNotEmpty()
    salary: number;

    @IsString()
    @IsNotEmpty()
    joining_date: Date;

    @IsOptional()
    updated_date?: Date;

}
