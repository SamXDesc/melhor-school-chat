import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, WsResponse } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users: number = 0;

    async handleConnection() {

        // A client has connected
        this.users++;

        // Notify connected clients of current users
        this.server.emit('userEntered', 'Um novo usuário acabou de entrar');

    }

    async handleDisconnect() {
        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('userLeft', 'Um usuário deixou a sala');

    }

    @SubscribeMessage('chat')
    async onChat(client, data) {
        data.content = data.content.replace('/<\/?[^>]+(>|$)/g', '');
        this.server.emit('chatRoom', data);
    }

    @SubscribeMessage('typing')
    onEvent(client, data: any): string {
        return data.condition ? this.server.emit('whoIsTyping', { user: data.user, message: `${data.user} está digitando uma mensagem` })
            : this.server.emit('whoIsTyping', { user: data.user, message: 'A beautiful World' });

    }

}
