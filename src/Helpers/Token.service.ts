import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class createToken {
    constructor(
        private jwtService: JwtService
    ) { }

    async genToken(payload: any) {
        console.log(payload)
        const token = await this.jwtService.signAsync(payload, {
            secret: 'secret',
            expiresIn: '1h',
        })
        return token
    }
}
