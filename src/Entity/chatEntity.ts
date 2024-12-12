// src/chat/entities/chat.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    senderId: string;

    @Column()
    receiverId: string;

    @Column('text')
    message: string;

    @Column()
    timestamp: Date;
}
