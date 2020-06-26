import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';

// eslint-disable-next-line import/named
import { bootstrap, initDb, cleanup, payloads, createUser } from './utils';
import { CoursesService } from '../src/api/courses/courses.service';
import { AuthModule } from '../src/api/auth/auth.module';
import { CategoriesModule } from '../src/api/categories/categories.module';
import { CoursesModule } from '../src/api/courses/courses.module';

import { CoursesRepository } from '../src/api/courses/courses.repository';
import { Course } from '../src/api/courses/entities/course.entity';

describe('Course (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let token: string;
  const url = '/api/v1/courses';

  beforeAll(async () => {
    [app, module] = await bootstrap([AuthModule, CoursesModule, CategoriesModule]);
    [token] = await initDb(module, payloads.userPayload, payloads.categoryPayload);
  });

  describe('POST /api/v1/courses', () => {
    describe('on valid input', () => {
      let res: request.Response;
      let course: Course;
      const payload = {};

      beforeAll(async () => {
        res = await request(app.getHttpServer())
          .post(url)
          .send(payload)
          .set('Authorization', token);
        course = await module.get(CoursesRepository).findOne({ slug: res.body.slug });
      });

      it('should return 201 CREATED', () => {
        expect(res.status).toBe(201);
      });

      it('should save the course correctly in db', async () => {
        expect(course.id).toBe(res.body.id);
      });
    });

    describe('on invalid input', () => {
      it('should return 401 on invalid token', async () => {
        await request(app.getHttpServer())
          .post(url)
          .set('Authorization', 'INVALID_TOKEN')
          .send()
          .expect(401);
      });
    });
  });

  describe('POST /api/v1/courses/:id/publish', () => {
    let createdCourse: Course;
    let res: request.Response;

    beforeAll(async () => {
      createdCourse = await module.get(CoursesService).create(payloads.userPayload.id);
      res = await request(app.getHttpServer())
        .post(`${url}/${createdCourse.id}/publish`)
        .set('Authorization', token)
        .send();
    });

    it('should return 200 SUCCESS', () => {
      expect(res.status).toBe(200);
    });

    it('should set the publishedAt correctly', async () => {
      const course = await module.get(CoursesService).getByIdOrSlug(res.body.id);
      expect(course.publishedAt).not.toBeNull();
    });

    it('should return 401 on invalid token', async () => {
      await request(app.getHttpServer())
        .post(`${url}/${createdCourse.id}/publish`)
        .set('Authorization', 'INVALID_TOKEN')
        .send()
        .expect(401);
    });

    it('should return 404 on invalid id', async () => {
      await request(app.getHttpServer())
        .post(`${url}/INVALID_ID/publish`)
        .set('Authorization', token)
        .send()
        .expect(404);
    });

    it('should return 403 on invalid user', async () => {
      const newToken = await createUser(module, {
        firstName: 'John',
        lastName: 'Doe',
        email: 'different-than-creator-publish@gmail.com',
        password: '123456',
        confirmPassword: '123456',
      });

      await request(app.getHttpServer())
        .post(`${url}/${createdCourse.id}/publish`)
        .set('Authorization', newToken)
        .send()
        .expect(403);
    });
  });

  describe('GET /api/v1/courses/:idOrSlug', () => {
    let createdCourse: Course;
    let result: request.Response;

    beforeAll(async () => {
      createdCourse = await module
        .get(CoursesService)
        .create(payloads.userPayload.id, { category: payloads.categoryPayload });
      result = await request(app.getHttpServer())
        .get(`${url}/${createdCourse.id}`)
        .send();
    });

    it('should get course successfully', () => {
      expect(result.body.id).toBe(createdCourse.id);
    });

    it('should have lessons populated', () => {
      expect(result.body.lessons.length).toBe(0);
    });

    it('should have creator populated', () => {
      expect(result.body.creator.id).toBe(payloads.userPayload.id);
    });

    it('should have category populated', () => {
      expect(result.body.category).toMatchObject(payloads.categoryPayload);
    });

    it('should return 404 on invalid slug', async () => {
      await request(app.getHttpServer())
        .get(`${url}/INVALID_ID`)
        .send()
        .expect(404);
    });
  });

  describe('DELETE /api/v1/courses', () => {
    let createdCourse: Course;

    beforeAll(async () => {
      createdCourse = await module.get(CoursesService).create(payloads.userPayload.id);
    });

    it('should return 404 NotFound on invalid id', async () => {
      await request(app.getHttpServer())
        .delete(`${url}/invalid_id`)
        .set('Authorization', token)
        .send()
        .expect(404);
    });

    it('should return 401 Unauthorized on invalid token', async () => {
      await request(app.getHttpServer())
        .delete(`${url}/${createdCourse.id}`)
        .set('Authorization', 'INVALID_TOKEN')
        .send()
        .expect(401);
    });

    it('should return 403 Forbidden on different user than creator', async () => {
      const newToken = await createUser(module, {
        firstName: 'John',
        lastName: 'Doe',
        email: 'different-than-creator@gmail.com',
        password: '123456',
        confirmPassword: '123456',
      });

      await request(app.getHttpServer())
        .delete(`${url}/${createdCourse.id}`)
        .set('Authorization', newToken)
        .send()
        .expect(403);
    });

    it('should delete the course successfully', async () => {
      await request(app.getHttpServer())
        .delete(`${url}/${createdCourse.id}`)
        .set('Authorization', token)
        .send();

      const course = await module.get(CoursesRepository).findOne(createdCourse.id);
      expect(course).toBe(undefined);
    });
  });

  describe('PATCH /api/v1/courses/:id', () => {
    let createdCourse: Course;
    const payload = { title: 'NEW_TITLE' };

    beforeAll(async () => {
      createdCourse = await module.get(CoursesService).create(payloads.userPayload.id);
    });

    it('should return 404 NotFound on invalid id', async () => {
      await request(app.getHttpServer())
        .patch(`${url}/invalid_id`)
        .set('Authorization', token)
        .send(payload)
        .expect(404);
    });

    it('should return 401 Unauthorized on invalid token', async () => {
      await request(app.getHttpServer())
        .patch(`${url}/${createdCourse.id}`)
        .set('Authorization', 'INVALID_TOKEN')
        .send(payload)
        .expect(401);
    });

    it('should return 403 Forbidden on different user than creator', async () => {
      const newToken = await createUser(module, {
        firstName: 'John',
        lastName: 'Doe',
        email: 'different-than-creator-update@gmail.com',
        password: '123456',
        confirmPassword: '123456',
      });

      await request(app.getHttpServer())
        .patch(`${url}/${createdCourse.id}`)
        .set('Authorization', newToken)
        .send(payload)
        .expect(403);
    });

    it('should update the course successfully', async () => {
      await request(app.getHttpServer())
        .patch(`${url}/${createdCourse.id}`)
        .set('Authorization', token)
        .send(payload);

      const course = await module.get(CoursesRepository).findOne(createdCourse.id);
      expect(course.title).toBe(payload.title);
    });
  });

  afterAll(async () => {
    await module.get(CoursesRepository).delete({});
    await cleanup(app, module);
  });
});
