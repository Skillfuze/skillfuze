import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '../src/api/auth/auth.service';
import { UserRepository } from '../src/api/users/user.repository';
import { BlogService } from '../src/api/blog/blog.service';
import { ormConfig } from './config';
import { BlogModule } from '../src/api/blog/blog.module';
import { AuthModule } from '../src/api/auth/auth.module';
import { BlogRepository } from '../src/api/blog/blog.repository';
import { UserService } from '../src/api/users/user.service';

describe('Blogs (e2e)', () => {
  let app: INestApplication;
  let blogService: BlogService;
  let module: TestingModule;
  let userService: UserService;
  let userRepo: UserRepository;
  let token: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, BlogModule],
    }).compile();

    const payload = {
      firstName: 'Khaled',
      lastName: 'Mohamed',
      email: 'khaled123@skillfuze.com',
      password: '123456789',
      confirmPassword: '123456789',
    };
    userService = module.get<UserService>(UserService);
    userRepo = module.get<UserRepository>(UserRepository);

    const user = await userService.register(payload);
    const authService = module.get<AuthService>(AuthService);
    token = `Bearer ${authService.generateToken(user)}`;

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api/v1');
    await app.init();
    blogService = module.get<BlogService>(BlogService);
  });

  describe('POST /api/v1/blogs', () => {
    const url = '/api/v1/blogs';
    const payload = {
      title: 'Test Title',
      content: 'Blog Content',
      tags: ['tag1', 'tag2'],
    };
    it('should create a blog successfully', async () => {
      const res = await request(app.getHttpServer())
        .post(url)
        .send(payload)
        .set('Authorization', token)
        .expect(201);

      const blog = await blogService.findOne({ id: res.body.id });
      expect(blog).not.toBe(undefined);
      expect(blog.id).toBe(res.body.id);
    });
  });
  afterEach(async () => {
    const blogRepo = module.get<BlogRepository>(BlogRepository);
    await blogRepo.delete({});
  });
  afterAll(async () => {
    await userRepo.delete({});
    await app.close();
  });
});
