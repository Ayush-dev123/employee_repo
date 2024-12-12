
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
import { AmazonS3Controller } from './amazon_s3/amazon_s3.controller';
import { AmazonS3Service } from './amazon_s3/amazon_s3.service';
import { AmazonS3Module } from './amazon_s3/amazon_s3.module';
import { Chat } from './Entity/chatEntity';
import { ChatModule } from './Chat/Chat.module';
import { APP_GUARD } from '@nestjs/core';



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
      entities: [admin, employee, employeeDetail, super_admin_table, Chat],
    }), AdminModule, EmployeeModule, SuperAdminModule, AuthModule, CommonModule, RedisModule, ConfigModule.forRoot(), AmazonS3Module, ChatModule],
  controllers: [AppController, AmazonS3Controller],
  providers: [AppService, AmazonS3Service],
})
export class AppModule { }
