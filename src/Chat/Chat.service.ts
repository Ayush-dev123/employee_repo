// // src/chat/chat.service.ts
// import { Injectable } from '@nestjs/common';
// import { CreateChatDto } from '../DTO/chatDto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Chat } from 'src/Entity/chatEntity';

// @Injectable()
// export class ChatService {
//     constructor(
//         @InjectRepository(Chat)
//         private chatRepository: Repository<Chat>,
//     ) { }

//     async saveMessage(createChatDto: CreateChatDto): Promise<Chat> {
//         const message = this.chatRepository.create(createChatDto);
//         return this.chatRepository.save(message);
//     }
//     async findAll() {
//         return this.chatRepository.find();
//     }
// }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../Entity/chatEntity';
import { CreateChatDto } from '../DTO/chatDto';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
    ) { }

    async saveMessage(createChatDto: CreateChatDto): Promise<Chat> {
        const chatMessage = this.chatRepository.create(createChatDto);
        return this.chatRepository.save(chatMessage);
    }

    async findAll(): Promise<Chat[]> {
        return this.chatRepository.find();
    }

    async findMessagesBetweenUsers(senderId: string, receiverId: string): Promise<Chat[]> {
        return this.chatRepository.find({
            where: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
            order: { timestamp: 'ASC' },
        });
    }
}

