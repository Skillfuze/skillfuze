import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Server, Socket } from 'socket.io';
import { LivestreamsEvents } from '@skillfuze/types';

@WebSocketGateway({ namespace: 'livestreams', transports: ['websocket'] })
export class LivestreamsEventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  private rooms: Map<string, number> = new Map<string, number>();

  public handleDisconnect(client: Socket): void {
    const { streamId } = client.handshake.query;
    this.rooms[streamId] -= 1;
    this.server.to(streamId).emit(LivestreamsEvents.WATCHING_NOW, this.rooms[streamId]);
  }

  public handleConnection(client: Socket): void {
    const { streamId } = client.handshake.query;

    client.join(streamId, () => {
      this.rooms[streamId] = this.rooms[streamId] ? this.rooms[streamId] + 1 : 1;
      this.server.to(streamId).emit(LivestreamsEvents.WATCHING_NOW, this.rooms[streamId]);
    });
  }

  @SubscribeMessage(LivestreamsEvents.CHAT)
  public handleChat(@MessageBody() data: string, @ConnectedSocket() client: Socket): void {
    const { streamId } = client.handshake.query;
    client.broadcast.to(streamId).emit(LivestreamsEvents.CHAT, data);
  }
}
