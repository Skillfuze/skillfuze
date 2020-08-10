import { PaginatedResponse, GetCourseLessonResponseDTO } from '@skillfuze/types';
import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import slugify from 'slugify';
import shortid from 'shortid';

import { CoursesRepository } from './repositories/courses.repository';
import { Course } from './entities/course.entity';
import { User } from '../users/user.entity';
import { CoursePayloadDTO } from './dtos/course-payload.dto';
import { MaterialViewsRepository } from '../materials/material-views.repository';
import { CourseLessonsRepository } from './repositories/lessons.repository';

@Injectable()
export class CoursesService {
  public constructor(
    private readonly repository: CoursesRepository,
    private readonly materialViewsRepository: MaterialViewsRepository,
    private readonly lessonsRepository: CourseLessonsRepository,
  ) {}

  public async create(userId: number, payload?: CoursePayloadDTO): Promise<Course> {
    const course = this.repository.create(payload);
    course.slug = await this.generateSlug(course);
    course.creator = new User();
    course.creator.id = userId;

    course.enrolled = [course.creator];

    return this.repository.save(course);
  }

  public async getByIdOrSlug(idOrSlug: string): Promise<Course> {
    let course = await this.repository.findOne({ slug: idOrSlug }, { relations: ['lessons', 'enrolled'] });
    if (!course) {
      course = await this.repository.findOne(idOrSlug, { relations: ['lessons', 'enrolled'] });
    }

    if (!course) {
      throw new NotFoundException();
    }

    return course;
  }

  public async getUserCourses(username: string, skip = 0, take = 10): Promise<PaginatedResponse<Course>> {
    const [courses, count] = await this.repository.findAndCount({
      join: { alias: 'courses', innerJoin: { users: 'courses.creator' } },
      where: (qb) => {
        qb.where('users.username = :username', { username }).andWhere('publishedAt IS NOT NULL');
      },
      relations: ['creator'],
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

  public async getLesson(courseSlug: string, lessonId: string, userId: number): Promise<GetCourseLessonResponseDTO> {
    const course = await this.repository.findOne({ slug: courseSlug });
    const lesson = await this.lessonsRepository.findOne({ id: lessonId }, { relations: ['course'] });
    if (!lesson || !course || lesson.course.id !== course.id) {
      throw new NotFoundException();
    }

    if ((await this.repository.isUserEnrolled(userId, course.id)) === false) {
      throw new ForbiddenException();
    }

    const materialView = await this.materialViewsRepository.findOne({ id: lesson.materialId });

    return {
      ...lesson,
      url: materialView.url,
      content: materialView.content,
    };
  }

  public async enroll(courseId: string, userId: number): Promise<void> {
    const course = await this.getByIdOrSlug(courseId);

    if (course.enrolled.filter((enrolled) => enrolled.id === userId).length === 1) {
      throw new BadRequestException('User already enrolled.');
    }

    const newEnrolledUser = new User();
    newEnrolledUser.id = userId;
    course.enrolled.push(newEnrolledUser);

    await this.repository.save(course);
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
