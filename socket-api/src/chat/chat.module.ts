import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service'


@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    providers: [ ChatGateway, ChatService ],
    
})
export class ChatModule {}
