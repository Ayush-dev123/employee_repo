// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { employee } from '../Entity/employee'
// import { admin } from '../Entity/adminEntity';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { HelpersService } from '../Helpers/helpers.service'
// import { createToken } from '../Helpers/Token.service'
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from '../Auth/constant';
// import {super_admin_table} from '../Entity/superadminEntity'

// @Module({
//     imports: [
//         TypeOrmModule.forFeature([admin, employee,super_admin_table]),
//         JwtModule.register({
//             global: true,
//             secret: jwtConstants.secret,
//             signOptions: { expiresIn: '1h' },
//         }),
//     ],
//     controllers: [AuthController],
//     providers: [AuthService, HelpersService, createToken],

// })

// export class AuthModule { }




import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { admin } from '../Entity/adminEntity';
import { HelpersService } from '../Helpers/helpers.service'
import { employee } from '../Entity/employee'
import {super_admin_table} from '../Entity/superadminEntity'
 import {MicrosoftStrategy} from './microsoft.strategy'
import { jwtConstants } from './constant';

@Module({
    imports: [
        TypeOrmModule.forFeature([admin, employee, super_admin_table]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, HelpersService, GoogleStrategy,MicrosoftStrategy],
})
export class AuthModule {}

