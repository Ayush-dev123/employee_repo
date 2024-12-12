// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class WsJwtGuard implements CanActivate {
//     constructor(private readonly jwtService: JwtService) { }

//     canActivate(context: ExecutionContext): boolean | Promise<boolean> {
//         const client = context.switchToWs().getClient();
//         const token = client.handshake.headers.authorization?.split(' ')[1];

//         if (!token) return false;

//         try {
//             const payload = this.jwtService.verify(token);
//             client['user'] = payload; // Attach payload to the client
//             return true;
//         } catch (err) {
//             console.log('JWT validation failed:', err);
//             return false;
//         }
//     }
// }



// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { console } from 'inspector';
// import { Socket } from 'socket.io';

// @Injectable()
// export class WsJwtGuard implements CanActivate {
//     constructor() { }

//     canActivate(context: ExecutionContext): boolean | Promise<boolean> {
//         // const client: Socket = context.switchToWs().getClient();
//         // console.log("ayush", client)
//         // // const token = client.handshake.auth?.token; // Extract token from handshake auth
//         // const token = client.handshake.headers['authorization'];
//         // console.log("HHIII", token)

//         // if (!token) {
//         //     throw new UnauthorizedException('Token is required');
//         // }

//         // try {
//         //     const payload = this.jwtService.verify(token); // Validate the token
//         //     client['user'] = payload; // Attach user info to the socket
//         //     return true;
//         // } catch (error) {
//         //     throw new UnauthorizedException('Invalid token');
//         // }
//         console.log("guard")
//         return true
//     }
// }


import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './constant';
import { Request } from 'express';


@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log("Check", token)
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: "Employee_management@12345"
                }
            );
            console.log(payload)
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
