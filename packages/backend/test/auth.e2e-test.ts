import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from '../src/api/auth/auth.controller';
import { UserService } from '../src/api/users/user.service';
import { UserRepository } from '../src/api/users/user.repository';
import { AuthModule } from '../src/api/auth/auth.module';
import { ormConfig } from './config';

describe('AuthController (e2e)', () => {
  let moduleFixture: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  describe('POST /api/v1/auth/register', () => {
    const url = '/api/v1/auth/register';
    let userService: UserService;
    const payload = {
      firstName: 'Khaled',
      lastName: 'Mohamed',
      email: 'khaled@skillfuze.com',
      password: '123456789',
      confirmPassword: '123456789',
    };

    beforeAll(() => {
      userService = moduleFixture.get<UserService>(UserService);
    });

    it('should register the user and return 201', async () => {
      const res = await request(app.getHttpServer()).post(url).send(payload);

      expect(res.status).toBe(201);

      const user = await userService.findByEmail(payload.email);
      expect(user).not.toBe(undefined);
    });

    it('should return 400 on empty values', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .send({ ...payload, firstName: '' });

      expect(res.status).toBe(400);
    });

    it('should return 400 on duplicate emails', async () => {
      await request(app.getHttpServer()).post(url).send(payload);

      const res = await request(app.getHttpServer()).post(url).send(payload);

      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    const url = '/api/v1/auth/login';
    let authController: AuthController;
    const payload = {
      username: 'karim@skillfuze.com',
      password: '123456789',
    };
    const registerPayload = {
      firstName: 'karim',
      lastName: 'Elsayed',
      email: 'karim@skillfuze.com',
      password: '123456789',
      confirmPassword: '123456789',
    };

    beforeEach(async () => {
      authController = moduleFixture.get<AuthController>(AuthController);
      await authController.register(registerPayload);
    });
    it('should login the user and return 200', async () => {
      const res = await request(app.getHttpServer()).post(url).send(payload);

      expect(res.status).toBe(200);
    });

    it('should return 401 on empty values', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .send({ ...payload, username: '' });

      expect(res.status).toBe(401);
    });

    it('should return 400 on wrong password', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .send({ ...payload, password: '123567' });

      expect(res.status).toBe(400);
    });
  });

  afterEach(async () => {
    const userRepo = moduleFixture.get<UserRepository>(UserRepository);
    await userRepo.delete({});
  });

  afterAll(async () => {
    await app.close();
  });
});
