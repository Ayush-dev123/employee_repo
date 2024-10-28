import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import {adminService}  from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { employee } from '../Entity/employee'
import { admin } from '../Entity/adminEntity'


@Module({
    imports: [
        TypeOrmModule.forFeature([admin, employee]),
    ],
      controllers:[AdminController],
      providers: [adminService],
    
})
export class AdminModule {}
