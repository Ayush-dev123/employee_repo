
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdminService } from './super_admin.service'; 
import { employee } from '../Entity/employee'
import { admin } from '../Entity/adminEntity';
import { AdminModule } from 'src/admin/admin.module';
import { SuperAdminController } from './super_admin.controller';
import {HelpersService} from '../Helpers/helpers.service'
// import { superadmin } from 'src/Entity/superadminEntity';

@Module({
    imports: [
        TypeOrmModule.forFeature([admin, employee]),
      ],
      controllers:[SuperAdminController],
      providers: [SuperAdminService,HelpersService],
    
})
export class SuperAdminModule {}
