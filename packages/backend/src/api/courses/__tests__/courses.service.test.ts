import shortid from 'shortid';

import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from '../../users/user.entity';
import { CoursesService } from '../courses.service';
import { CoursesRepository } from '../courses.repository';
import { Course } from '../entities/course.entity';

jest.mock('../courses.repository');
jest.mock('shortid');

describe('CoursesService', () => {
  let service: CoursesService;
  let repository: CoursesRepository;
  let user: User;
  const shortidValue = 'SHORTID';

  beforeAll(async () => {
    jest.spyOn(shortid, 'generate').mockReturnValue(shortidValue);
    repository = new CoursesRepository();
    service = new CoursesService(repository);
    user = new User();
    user.id = 1;
  });

  describe('create', () => {
    let course: Course;
    let repoSaveSpy: jest.SpyInstance;

    beforeAll(async () => {
      repoSaveSpy = jest.spyOn(repository, 'save');
      course = await service.create(user.id);
    });

    it('should create a course successfully', () => {
      expect(course).toBeInstanceOf(Course);
    });

    it('should call repository.save once', () => {
      expect(repoSaveSpy).toBeCalledTimes(1);
    });

    it('should put the user in the course object', () => {
      expect(course.creator.id).toBe(user.id);
    });

    it('should have a correct slug', () => {
      expect(course.slug).toBe(shortidValue);
    });
  });

  describe('getByIdOrSlug', () => {
    const validId = 'VALID_ID';
    let course: Course;

    beforeAll(async () => {
      course = await service.getByIdOrSlug(validId);
    });

    it('should get one successfully', () => {
      expect(course).toBeInstanceOf(Course);
    });

    it('should have the lessons populated', () => {
      expect(course.lessons.length).toBe(0);
    });

    it('should throw NotFoundException on invalid slug', async () => {
      await expect(service.getByIdOrSlug('INVALID_ID')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getUserCourses', () => {
    const username = 'USERNAME';

    beforeAll(() => {
      jest.spyOn(repository, 'findAndCount').mockReturnValue(Promise.resolve([[new Course()], 1]));
    });

    it('should return courses array and count = 1', async () => {
      const res = await service.getUserCourses(username);
      expect(res.count).toBe(1);
      expect(res.data[0]).toBeInstanceOf(Course);
    });
  });

  describe('getUserEnrolledCourses', () => {
    const username = 'USERNAME';

    beforeAll(() => {
      jest.spyOn(repository, 'findAndCount').mockReturnValue(Promise.resolve([[new Course()], 1]));
    });

    it('should return courses array and count = 1', async () => {
      const res = await service.getUserCourses(username);
      expect(res.count).toBe(1);
      expect(res.data[0]).toBeInstanceOf(Course);
    });
  });

  describe('delete', () => {
    let repositorySoftDeleteSpy: jest.SpyInstance;
    const validId = 'VALID_ID';
    const userId = 1;

    beforeAll(() => {
      repositorySoftDeleteSpy = jest.spyOn(repository, 'softDelete');
    });

    beforeEach(() => {
      repositorySoftDeleteSpy.mockClear();
    });

    it('should resolve successfully on correct id and correct user', async () => {
      await expect(service.delete(userId, validId)).resolves.not.toThrow();
    });

    it('should call repository.softDelete once with correct id', async () => {
      await service.delete(userId, validId);
      expect(repositorySoftDeleteSpy).toBeCalledTimes(1);
      expect(repositorySoftDeleteSpy).toBeCalledWith(validId);
    });

    it('should throw NotFound exception on invalid id', async () => {
      await expect(service.delete(userId, 'INVALID_ID')).rejects.toThrowError(NotFoundException);
    });

    it('should throw Forbidden exception on invalid user', async () => {
      await expect(service.delete(2, validId)).rejects.toThrowError(ForbiddenException);
    });
  });

  describe('update', () => {
    let repoFindOneSpy: jest.SpyInstance;
    let repoUpdateSpy: jest.SpyInstance;

    let course: Course;
    const userId = 1;
    const courseId = 'VALID_ID';
    const newTitle = 'NEW_TITLE';
    const payload = {
      title: newTitle,
    };

    beforeAll(async () => {
      repoFindOneSpy = jest.spyOn(repository, 'findOne');
      repoUpdateSpy = jest.spyOn(repository, 'update');

      repoFindOneSpy.mockImplementation((id, options) => {
        if (id === courseId) {
          const c = new Course();
          c.title = newTitle;

          if (options?.relations?.includes('creator')) {
            c.creator = new User();
            c.creator.id = userId;
          }

          return c;
        }

        return undefined;
      });

      course = await service.update(userId, courseId, payload);
    });

    it('should update the course fields', () => {
      expect(course.title).toBe(newTitle);
    });

    it('should call repository.update once with correct parameters', () => {
      expect(repoUpdateSpy).toBeCalledTimes(1);
      expect(repoUpdateSpy).toBeCalledWith(courseId, payload);
    });

    it('should throw NotFound exception on wrong course id', async () => {
      await expect(service.update(userId, 'INVALID_ID', payload)).rejects.toThrowError(NotFoundException);
    });

    it('should throw Forbidden exception on invalid user', async () => {
      await expect(service.update(2, courseId, payload)).rejects.toThrowError(ForbiddenException);
    });
  });

  describe('publish', () => {
    const courseId = 'VALID_ID';
    const invalidCourseId = 'INVALID_ID';
    const userId = 1;
    let repoSaveSpy: jest.SpyInstance;
    let course: Course;

    beforeAll(async () => {
      jest.spyOn(Date, 'now').mockReturnValue(0);
      repoSaveSpy = jest.spyOn(repository, 'save');
      repoSaveSpy.mockClear();

      course = await service.publish(courseId, userId);
    });

    it('should set publishedAt with Date.now', () => {
      expect(course.publishedAt).toMatchObject(new Date(Date.now()));
    });

    it('should call repository.save once', () => {
      expect(repoSaveSpy).toBeCalledTimes(1);
    });

    it('should throw NotFound exception on invalid id', async () => {
      await expect(service.publish(invalidCourseId, userId)).rejects.toThrowError(NotFoundException);
    });

    it('should throw Forbidden exception on invalid user', async () => {
      await expect(service.publish(courseId, 2)).rejects.toThrowError(ForbiddenException);
    });
  });
});
