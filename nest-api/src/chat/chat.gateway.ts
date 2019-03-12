import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, WsResponse } from '@nestjs/websockets';
import { ChatService } from './chat.service'
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) {}

    @WebSocketServer() server;
    users: number = 0;

    async handleConnection(client) {
        // A client has connected
        this.users++;
        
        // Notify connected clients of current users
        this.server.emit('userEntered', {
            users: this.users,
            message: 'Um novo usuário acabou de entrar'
        });
    }

    async handleDisconnect() {
        // A client has disconnected
        this.users--;
        // Notify connected clients of current users
        this.server.emit('userLeft', {
            users: this.users,
            message: 'Um usuário deixou a sala'
        });

    }

    @SubscribeMessage('chat')
    async onChat(client, data) {
        data.content = encodeURIComponent(data.content);
        await this.chatService.createChat(data);
        this.server.emit('chatRoom', data);
    }

    @SubscribeMessage('retrieveMessages')
    async retrieveMessages (client) {
        client.emit('loadMessages', await this.chatService.findAll());
    }

    @SubscribeMessage('typing')
    async onEvent(client, data: any) {
        return data.condition ? this.server.emit('whoIsTyping', { user: data.user, message: `${data.user} está digitando uma mensagem` })
            : this.server.emit('whoIsTyping', { user: data.user, message: 'A beautiful World' });
    }
}
