import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../src/api/users/user.repository';
import { AuthService } from '../src/api/auth/services/auth.service';
import { User } from '../src/api/users/user.entity';
import { VideosRepository } from '../src/api/videos/videos.repository';
import { UserService } from '../src/api/users/user.service';
import { AuthModule } from '../src/api/auth/auth.module';
import { VideosModule } from '../src/api/videos/videos.module';
import { ormConfig } from './config';

describe('Videos (e2e)', () => {
  let videoRepository: VideosRepository;
  const url = '/api/v1/videos';
  let app: INestApplication;
  let module: TestingModule;
  let token: string;
  let user: User;
  let userService: UserService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, VideosModule],
    }).compile();

    const payload = {
      firstName: 'Khaled',
      lastName: 'Mohamed',
      email: 'khaled123@skillfuze.com',
      password: '123456789',
      confirmPassword: '123456789',
    };
    videoRepository = module.get<VideosRepository>(VideosRepository);
    userService = module.get<UserService>(UserService);
    user = await userService.register(payload);
    const authService = module.get<AuthService>(AuthService);
    token = `Bearer ${authService.generateToken(user)}`;

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  describe('POST /api/v1/videos', () => {
    const payload = {
      title: 'Video Title',
      url: 'http://a.com',
    };

    it('should create video successfully', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .send(payload)
        .set('Authorization', token)
        .expect(201);

      expect(res.body.id).not.toBe(undefined);

      const video = await videoRepository.findOne(res.body.id);
      expect(res.body.id).toBe(video.id);
    });

    it('should return BadRequest on empty title', async () => {
      await request(app.getHttpServer())
        .post(url)
        .send({ ...payload, title: undefined })
        .set('Authorization', token)
        .expect(400);
    });

    it('should return Unauthorized on invalid token', async () => {
      await request(app.getHttpServer())
        .post(url)
        .send({ ...payload, title: undefined })
        .set('Authorization', '')
        .expect(401);
    });
  });

  afterEach(async () => {
    await videoRepository.delete({});
  });

  afterAll(async () => {
    const userRepo = module.get<UserRepository>(UserRepository);
    await userRepo.delete({});
    await app.close();
  });
});
