import NodeMediaServer from 'node-media-server';
import { Injectable } from '@nestjs/common';

import config from '../../config';
import { LivestreamsService } from '../api/livestreams/livestreams.service';

@Injectable()
export class StreamingServer {
  private app: typeof NodeMediaServer;

  public constructor(private readonly livestreamsService: LivestreamsService) {
    this.app = new NodeMediaServer(config.streamingServer);

    this.app.on('prePublish', (id, streamPath) => {
      const session = this.app.getSession(id);
      session.authenticate = async (): Promise<boolean> => {
        const isValidKey = await this.livestreamsService.isValidKey(this.getStreamKey(streamPath));
        if (!isValidKey) {
          session.reject();
          return false;
        }

        return true;
      };
    });

    this.app.on('postPublish', (id, streamPath) => {
      this.livestreamsService.start(this.getStreamKey(streamPath));
    });

    this.app.on('donePublish', (id, streamPath) => {
      this.livestreamsService.stop(this.getStreamKey(streamPath));
    });
  }

  public run(): void {
    this.app.run();
  }

  public stop(): void {
    this.app.stop();
  }

  private getStreamKey(streamPath: string): string {
    return streamPath.split('/').pop();
  }
}
