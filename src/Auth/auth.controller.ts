// import { Controller, Get, Inject, Post, Res, Body, Param, Put, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { loginDto } from '../DTO/loginDto'
// import { createEmpDto } from '../DTO/employeeDto'
// import { AuthGuard } from './auth.guard';


// @Controller('auth')
// export class AuthController {
//     constructor(private readonly authService: AuthService) { }

//     @Post('login')
//     async login(@Body() logindto: loginDto) {

//         const login = await this.authService.login(logindto)
//         console.log(login)
//         if (login.code == 400) {
//             return {
//                 code: login.code,
//                 message: "credentials not matched"
//             }
//         }
//         return {
//             code: login.code,
//             message: "login successfull !!",
//             token: login.token
//         }
//     }





// }



import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { loginDto } from '../DTO/loginDto'
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) { }

    // Normal login endpoint
    @Post('login')
    async login(@Body() logindto: loginDto) {
        const login = await this.authService.login(logindto);
        if (login.code == 400) {
            return {
                code: login.code,
                message: "Credentials not matched",
            };
        }
        return {
            code: login.code,
            message: "Login successful!",
            token: login.token,
        };
    }

    // Google login endpoint
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        console.log(process.env.googleClientID)

    }

    // Google login callback endpoint
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        // Create and sign a JWT with the user info from Google
        const jwt = this.jwtService.sign({ user: req.user });
        return {
            message: "Google login successful!",
            user: req.user,
            token: jwt,
        };
    }


    @Get('microsoft')
    @UseGuards(AuthGuard('microsoft'))
    async microsoftAuth() { }


    

    @Get('microsoft/callback')
    @UseGuards(AuthGuard('microsoft'))
    async microsoftAuthRedirect(@Req() req) {
        const jwt = this.jwtService.sign({ user: req.user });
        return { message: "Microsoft login successful!", user: req.user, token: jwt };
    }
}

