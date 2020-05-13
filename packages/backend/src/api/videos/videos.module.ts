import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as tus from 'tus-node-server';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosRepository } from './videos.repository';
import config from '../../../config';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideosRepository])],
  providers: [VideosService],
  controllers: [VideosController],
})
export class VideosModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    const server = new tus.Server();

    server.datastore = config.tus.dataStore;

    consumer.apply(server.handle.bind(server)).forRoutes('videos/upload');
  }
}
