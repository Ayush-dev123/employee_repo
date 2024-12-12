
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './Chat.gatway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../Entity/chatEntity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { jwtConstants } from 'src/auth/constant';
import { PassportModule } from '@nestjs/passport';
// import { WsJwtGuard } from './WsJwtGuard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Chat]),

        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            global: true,
            secret: "Employee_management@12345",
            signOptions: { expiresIn: '1h' },
        }),
        // JwtModule.register({
        //     secret: jwtConstants.secret, // Replace with your secret key
        //     signOptions: { expiresIn: '1h' }, // Optional, adjust based on your needs
        // }),

    ],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway],
})
export class ChatModule { }
