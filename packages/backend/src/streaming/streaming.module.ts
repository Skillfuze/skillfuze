import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { StreamingServer } from './server';
import { LivestreamsModule } from '../api/livestreams/livestreams.module';

@Module({
  imports: [LivestreamsModule],
  providers: [StreamingServer],
})
export class StreamingModule implements OnModuleInit, OnModuleDestroy {
  public constructor(private server: StreamingServer) {}

  public onModuleInit(): void {
    this.server.run();
  }

  public onModuleDestroy() {
    this.server.stop();
  }
}
