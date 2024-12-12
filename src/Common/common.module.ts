import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { employee } from '../Entity/employee'
import { admin } from '../Entity/adminEntity';
import { CommonController } from './common.controller'
import { CommonService } from './common.service'
import { HelpersService } from 'src/Helpers/helpers.service';
import { NodemailerService } from 'src/Helpers/nodeMailer.service';
import { RedisModule } from '../Redis/redis.module';
import { super_admin_table } from '../Entity/superadminEntity'
// import { NodemailerService } from 'src/Helpers/nodeMailer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([admin, employee, super_admin_table]), RedisModule
    ],
    controllers: [CommonController],
    providers: [CommonService, HelpersService, NodemailerService],

})
export class CommonModule { }
