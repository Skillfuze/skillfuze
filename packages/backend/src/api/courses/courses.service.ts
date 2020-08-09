import { PaginatedResponse } from '@skillfuze/types';
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import slugify from 'slugify';
import shortid from 'shortid';
import { CoursesRepository } from './courses.repository';
import { Course } from './entities/course.entity';
import { User } from '../users/user.entity';
import { CoursePayloadDTO } from './dtos/course-payload.dto';

@Injectable()
export class CoursesService {
  public constructor(private readonly repository: CoursesRepository) {}

  public async create(userId: number, payload?: CoursePayloadDTO): Promise<Course> {
    const course = this.repository.create(payload);
    course.slug = await this.generateSlug(course);
    course.creator = new User();
    course.creator.id = userId;

    return this.repository.save(course);
  }

  public async getByIdOrSlug(idOrSlug: string): Promise<Course> {
    let course = await this.repository.findOne({ slug: idOrSlug }, { relations: ['lessons'] });
    if (!course) {
      course = await this.repository.findOne(idOrSlug, { relations: ['lessons'] });
    }

    if (!course) {
      throw new NotFoundException();
    }

    return course;
  }

  public async getCategoryCourses(slug: string, skip = 0, take = 10): Promise<PaginatedResponse<Course>> {
    const [courses, count] = await this.repository.findAndCount({
      join: { alias: 'courses', innerJoin: { categories: 'courses.category' } },
      where: (qb) => {
        qb.where('categories.slug = :slug', { slug });
      },
      relations: ['creator', 'category'],
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    return {
      data: courses,
      count,
    };
  }

  public async getUserCourses(username: string, skip = 0, take = 10): Promise<PaginatedResponse<Course>> {
    const [courses, count] = await this.repository.findAndCount({
      join: { alias: 'courses', innerJoin: { users: 'courses.creator' } },
      where: (qb) => {
        qb.where('users.username = :username', { username }).andWhere('publishedAt IS NOT NULL');
      },
      relations: ['creator', 'category'],
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    return {
      data: courses,
      count,
    };
  }

  public async getUserEnrolledCourses(username: string, skip = 0, take = 10): Promise<PaginatedResponse<Course>> {
    const [enrolled, count] = await this.repository.findAndCount({
      join: { alias: 'courses', leftJoinAndSelect: { enrolled: 'courses.enrolled' } },
      where: (qb) => {
        qb.where('enrolled.username = :username', { username }).andWhere('publishedAt IS NOT NULL');
      },
      relations: ['creator'],
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    return {
      data: enrolled,
      count,
    };
  }

  public async delete(userId: number, courseId: string): Promise<void> {
    const course = await this.repository.findOne(courseId, { relations: ['creator'] });
    if (!course) {
      throw new NotFoundException();
    }

    if (course.creator.id !== userId) {
      throw new ForbiddenException();
    }

    await this.repository.softDelete(courseId);
  }

  public async update(userId: number, courseId: string, payload: CoursePayloadDTO): Promise<Course> {
    let course = await this.repository.findOne(courseId, { relations: ['creator'] });
    if (!course) {
      throw new NotFoundException();
    }

    if (course.creator.id !== userId) {
      throw new ForbiddenException();
    }

    const { lessons } = payload;
    // eslint-disable-next-line no-param-reassign
    delete payload.lessons;
    await this.repository.update(courseId, payload);

    const oldTitle = course.title;
    course = await this.repository.findOne(courseId);

    if (payload.title !== oldTitle) {
      course.slug = await this.generateSlug(course);
    }

    course.lessons = lessons;
    return this.repository.save(course);
  }

  public async publish(courseId: string, userId: number): Promise<Course> {
    const course = await this.repository.findOne(courseId, { relations: ['creator'] });

    if (!course) {
      throw new NotFoundException();
    }

    if (course.creator.id !== userId) {
      throw new ForbiddenException();
    }

    course.publishedAt = new Date(Date.now());

    return this.repository.save(course);
  }

  private async generateSlug(course: Course): Promise<string> {
    let slug: string;
    if (course.title) {
      const titleSlug = slugify(course.title);
      const [isFound] = await this.repository.find({ slug: titleSlug });
      if (isFound) {
        slug = `${titleSlug}-${shortid.generate()}`;
      } else {
        slug = titleSlug;
      }
    } else {
      slug = shortid.generate();
    }

    return slug;
  }
}
