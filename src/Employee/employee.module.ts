import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { employee } from '../Entity/employee'
import { employeeDetail } from '../Entity/employeeDetail';
import { employeeDetailController } from './employee.controller';
import { employeeDetailService } from './employee.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([employeeDetail, employee]),
    ],
    controllers: [employeeDetailController],
    providers: [employeeDetailService],
})
export class EmployeeModule { }
