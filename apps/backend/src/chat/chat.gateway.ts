import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleMessage(@MessageBody() payload: any, @ConnectedSocket() _client: Socket) {
    // Broadcast message to room or all
    this.server.emit('message', payload);
  }
}
