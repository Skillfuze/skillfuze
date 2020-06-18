import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { Livestream } from '../src/api/livestreams/livestream.entity';

import { UserRepository } from '../src/api/users/user.repository';
import { LivestreamsRepository } from '../src/api/livestreams/livestreams.repository';
import { User } from '../src/api/users/user.entity';
import { UserService } from '../src/api/users/user.service';
import { AuthService } from '../src/api/auth/services/auth.service';
import { LivestreamsModule } from '../src/api/livestreams/livestreams.module';
import { AuthModule } from '../src/api/auth/auth.module';
import { ormConfig } from './config';
import { CategoriesRepository } from '../src/api/categories/categories.repository';
import { CategoriesModule } from '../src/api/categories/categories.module';

describe('Livestreams (e2e)', () => {
  const url = '/api/v1/livestreams';
  let app: INestApplication;
  let module: TestingModule;
  let token: string;
  let user: User;
  let categoriesRepo: CategoriesRepository;
  let userService: UserService;
  let livestreamsRepository: LivestreamsRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, LivestreamsModule, CategoriesModule],
    }).compile();

    const payload = {
      firstName: 'Khaled',
      lastName: 'Mohamed',
      email: 'khaled123@skillfuze.com',
      password: '123456789',
      confirmPassword: '123456789',
    };
    userService = module.get<UserService>(UserService);
    livestreamsRepository = module.get<LivestreamsRepository>(LivestreamsRepository);

    categoriesRepo = module.get(CategoriesRepository);
    await categoriesRepo.save({ id: 1, name: 'Test' });

    user = await userService.register(payload);
    const authService = module.get<AuthService>(AuthService);
    token = `Bearer ${authService.generateToken(user)}`;

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  describe('POST /api/v1/livestreams', () => {
    const payload = {
      title: 'Livestream Title',
      category: { id: 1 },
    };

    it('should create livestream successfully', async () => {
      const res = await request(app.getHttpServer()).post(url).send(payload).set('Authorization', token).expect(201);

      expect(res.body.id).not.toBe(undefined);

      const livestream = await livestreamsRepository.findOne(res.body.id);
      expect(res.body.streamKey).toBe(livestream.streamKey);
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

  describe('GET /api/v1/livestreams/:id', () => {
    let createdStream: Livestream;
    const payload = {
      title: 'Livestream Title',
      category: { id: 1 },
    };
    beforeAll(async () => {
      const res = await request(app.getHttpServer()).post(url).send(payload).set('Authorization', token).expect(201);

      createdStream = res.body;
    });

    it('should get livestream successfully with streamer data', async () => {
      const res = await request(app.getHttpServer()).get(`${url}/${createdStream.id}`);
      expect(res.body.id).toStrictEqual(createdStream.id);
      expect(res.body.streamer).toHaveProperty('firstName');
      expect(res.body.streamer).toHaveProperty('lastName');
      expect(res.body.streamer).toHaveProperty('email');
      expect(res.body.streamer).toHaveProperty('id');
      expect(res.body.streamer).not.toHaveProperty('password');
    });

    it('should return NotFoundException on invalid streamId', async () => {
      await request(app.getHttpServer()).get(`${url}/id`).expect(404);
    });
  });

  afterEach(async () => {
    await livestreamsRepository.delete({});
  });

  afterAll(async () => {
    const userRepo = module.get<UserRepository>(UserRepository);
    await userRepo.delete({});
    await categoriesRepo.delete({});
    await app.close();
  });
});
