import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async createChat(data) {
    const { content, user} = data;
    const { name, avatar } = user;
    
    let newChat = new Chat();
    newChat.message = content;
    newChat.avatar = avatar;
    newChat.user = name;
    
    return await this.chatRepository.save(newChat);
  }

  async findAll(): Promise<Chat[]> {
    return await this.chatRepository.find();
  }
}