import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../src/api/categories/categories.module';
import { CreateLivestreamDTO } from '../src/api/livestreams/dtos/create-livestream.dto';
import { Livestream } from '../src/api/livestreams/livestream.entity';
import { User } from '../src/api/users/user.entity';
import { LivestreamsService } from '../src/api/livestreams/livestreams.service';
import { AuthService } from '../src/api/auth/services/auth.service';
import { CategoriesRepository } from '../src/api/categories/categories.repository';
import { UsersModule } from '../src/api/users/users.module';
import { UserService } from '../src/api/users/user.service';
import { UserRepository } from '../src/api/users/user.repository';
import { AuthModule } from '../src/api/auth/auth.module';
import { ormConfig } from './config';
import { LivestreamsModule } from '../src/api/livestreams/livestreams.module';

describe('UsersController (e2e)', () => {
  let module: TestingModule;
  let app: INestApplication;
  let token: string;
  let user: User;
  let livestream: Livestream;
  let categoriesRepo: CategoriesRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, LivestreamsModule, UsersModule, CategoriesModule],
    }).compile();
    categoriesRepo = module.get(CategoriesRepository);
    const userService = module.get<UserService>(UserService);
    const livestreamsService = module.get<LivestreamsService>(LivestreamsService);
    const authService = module.get<AuthService>(AuthService);

    const userPayload = {
      firstName: 'Karim',
      lastName: 'Elsayed',
      email: 'karim@skillfuze.com',
      password: '123456789',
      confirmPassword: '123456789',
    };
    const category = await categoriesRepo.save({ id: 1, name: 'Test' });
    let livestreamPayload = new CreateLivestreamDTO();
    livestreamPayload = {
      title: 'Livestream Title',
      category,
    };

    user = await userService.register(userPayload);
    livestream = await livestreamsService.create(user.id, livestreamPayload);
    await livestreamsService.start(livestream.streamKey);
    token = `Bearer ${authService.generateToken(user)}`;

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  describe('GET /api/v1/users/:username', () => {
    const url = '/api/v1/users';

    it('should get profile data successfully with currently livestream if found', async () => {
      const res = await request(app.getHttpServer()).get(`${url}/${user.username}/profile`).set('Authorization', token);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('username');
      expect(res.body).toHaveProperty('firstName');
      expect(res.body).toHaveProperty('lastName');
      expect(res.body).toHaveProperty('email');
      expect(res.body).toHaveProperty('avatarURL');
      expect(res.body).toHaveProperty('bio');
      expect(res.body.livestreams[0].isLive).toBe(true);
    });

    it('should return 404 with message UserNotFound on invalid username', async () => {
      const res = await request(app.getHttpServer())
        .get(`${url}/user-wrongUsername/profile`)
        .set('Authorization', token)
        .expect(404);

      expect(res.body.message).toBe('User not found');
    });
  });

  describe('GET /api/v1/users/:username/videos', () => {
    const url = '/api/v1/users';

    it('should get the user videos successfully', async () => {
      const res = await request(app.getHttpServer()).get(`${url}/${user.username}/videos`).send().expect(200);

      expect(res.body.data.length).toBe(0);
      expect(res.body.count).toBe(0);
    });
  });

  describe('GET /api/v1/users/:username/blogs', () => {
    const url = '/api/v1/users';

    it('should get the user blogs and their count successfully', async () => {
      const res = await request(app.getHttpServer()).get(`${url}/${user.username}/blogs`).send().expect(200);

      expect(res.body.data.length).toBe(0);
      expect(res.body.count).toBe(0);
    });
  });

  describe('GET /api/v1/users/:username/courses', () => {
    const url = '/api/v1/users';

    it('should get the user courses and their count successfully', async () => {
      const res = await request(app.getHttpServer()).get(`${url}/${user.username}/courses`).send().expect(200);

      expect(res.body.data.length).toBe(0);
      expect(res.body.count).toBe(0);
    });
  });

  describe('GET /api/v1/users/:username/enrolledCourses', () => {
    const url = '/api/v1/users';

    it('should get the user enrolledCourses and their count successfully', async () => {
      const res = await request(app.getHttpServer()).get(`${url}/${user.username}/enrolledCourses`).send().expect(200);

      expect(res.body.data.length).toBe(0);
      expect(res.body.count).toBe(0);
    });
  });
  afterEach(async () => {
    const userRepo = module.get<UserRepository>(UserRepository);
    await userRepo.delete({});
  });

  afterAll(async () => {
    await categoriesRepo.delete({});
    await app.close();
  });
});
