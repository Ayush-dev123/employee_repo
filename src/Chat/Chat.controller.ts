import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from '../DTO/chatDto';
import { Chat } from 'src/Entity/chatEntity';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post("/send")
    async saveMessage(@Body() createChatDto: CreateChatDto): Promise<Chat> {
        return this.chatService.saveMessage(createChatDto);
    }

    @Get('messages')
    async getMessages(): Promise<Chat[]> {
        return this.chatService.findAll();
    }
}
