
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { SuperAdminModule } from './super_admin/super_admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { admin } from './Entity/adminEntity';
import { employee } from './Entity/employee';
import { employeeDetail } from './Entity/employeeDetail';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { super_admin_table } from './Entity/superadminEntity';
import { CommonModule } from './common/common.module';
import { RedisModule } from './Redis/redis.module'
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres', 
    host: 'localhost', 
    port: 5432, 
    username: 'postgres', 
    password: 'Ayush@123', 
    database: 'employee_management', 
    synchronize: true,
    entities: [admin,employee,employeeDetail,super_admin_table], 
  }),AdminModule,EmployeeModule,SuperAdminModule, AuthModule, CommonModule,RedisModule ,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
