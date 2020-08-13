import { MaterialViewsRepository } from '../../materials/material-views.repository';
import { CourseLessonsRepository } from '../../courses/repositories/lessons.repository';
import { LivestreamsService } from '../../livestreams/livestreams.service';
import { LivestreamsRepository } from '../../livestreams/livestreams.repository';
import { CoursesRepository } from '../../courses/repositories/courses.repository';
import { BlogService } from '../../blog/blog.service';
import { VideosService } from '../../videos/videos.service';
import { VideosRepository } from '../../videos/videos.repository';
import { BlogsEventEmitter } from '../../blog/blogs.eventemitter';
import { BlogRepository } from '../../blog/blog.repository';
import { CoursesService } from '../../courses/courses.service';
import { CategoriesController } from '../categories.controller';
import { CategoriesService } from '../categories.service';
import { CategoriesRepository } from '../categories.repository';

jest.mock('../categories.service.ts');
jest.mock('../../blog/blog.service');
jest.mock('../../videos/videos.service');
jest.mock('../../courses/courses.service');
jest.mock('../../livestreams/livestreams.service');

describe('Categories Controller', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeAll(async () => {
    service = new CategoriesService(new CategoriesRepository());
    controller = new CategoriesController(
      service,
      new VideosService(new VideosRepository()),
      new BlogService(new BlogRepository(), new BlogsEventEmitter()),
      new CoursesService(new CoursesRepository(), new MaterialViewsRepository(), new CourseLessonsRepository()),
      new LivestreamsService(new LivestreamsRepository()),
    );
  });

  describe('getAll', () => {
    const serviceReturnValue = [{ id: 1, name: 'Category 1' }];
    let result: any;

    beforeAll(async () => {
      jest.spyOn(service, 'getAll').mockReturnValue(new Promise((resolve) => resolve(serviceReturnValue)));
      result = await controller.getAll();
    });

    it('should return all categories', () => {
      expect(result).toBe(serviceReturnValue);
    });

    it('should call service.getAll once', () => {
      expect(service.getAll).toBeCalledTimes(1);
    });
  });
});
