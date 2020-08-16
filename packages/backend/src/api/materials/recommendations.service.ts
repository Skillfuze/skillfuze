import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Livestream } from '../livestreams/livestream.entity';
import { Video } from '../videos/video.entity';
import { Category } from '../categories/category.entity';
import { User } from '../users/user.entity';
import { Blog } from '../blog/blog.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class RecommendationsService {
  public async getTrendingLivestreams(limit = 10): Promise<Livestream[]> {
    const livestreams = await getConnection()
      .createQueryBuilder()
      .from(Livestream, 'livestream')
      .where('isLive = 1')
      .orderBy('watchingNow', 'DESC')
      .limit(limit)
      .leftJoin('livestream.streamer', 'user')
      .leftJoin('livestream.category', 'category')
      .select('category.*, user.*, livestream.*')
      .getRawMany();
    return this.mapToEntity(Livestream, livestreams);
  }

  public async getRecommendedCourses(limit = 10): Promise<Course[]> {
    const courses = await getConnection()
      .createQueryBuilder()
      .from((qb) => {
        return qb
          .from(Course, 'course')
          .leftJoin('course_enrolled_user', 'enrolled', 'course.id = enrolled.courseId')
          .groupBy('course.id')
          .select('course.*, COUNT(enrolled.userId) AS enrolledCount')
          .having('enrolledCount >= AVG(enrolledCount) AND course.publishedAt IS NOT NULL')
          .orderBy('createdAt', 'DESC')
          .limit(1000);
      }, 'course')
      .orderBy('enrolledCount', 'DESC')
      .limit(limit)
      .leftJoin(Category, 'category', 'category.id = course.categoryId')
      .leftJoin(User, 'user', 'user.id = course.creatorId')
      .select('category.*, user.*, course.*')
      .getRawMany();

    return this.mapToEntity(Course, courses);
  }

  public async getRecommendedVideos(limit = 10): Promise<Video[]> {
    const videos = await getConnection()
      .createQueryBuilder()
      .from((qb) => {
        return qb
          .from(Video, 'video')
          .where('views >= (SELECT AVG(views) FROM video)')
          .orderBy('createdAt', 'DESC')
          .limit(1000);
      }, 'video')
      .orderBy('views', 'DESC')
      .limit(limit)
      .leftJoin(Category, 'category', 'category.id = video.categoryId')
      .leftJoin(User, 'user', 'user.id = video.uploaderId')
      .select('category.*, user.*, video.*')
      .getRawMany();

    return this.mapToEntity(Video, videos);
  }

  public async getRecommendedBlogs(limit = 10): Promise<Blog[]> {
    const blogs = await getConnection()
      .createQueryBuilder()
      .from((qb) => {
        return qb
          .from(Blog, 'blog')
          .where('views >= (SELECT AVG(views) FROM blog) AND publishedAt IS NOT NULL')
          .orderBy('publishedAt', 'DESC')
          .limit(1000);
      }, 'blog')
      .orderBy('views', 'DESC')
      .limit(limit)
      .leftJoin(Category, 'category', 'category.id = blog.categoryId')
      .leftJoin(User, 'user', 'user.id = blog.userId')
      .select('category.*, user.*, blog.*')
      .getRawMany();
    return this.mapToEntity(Blog, blogs);
  }

  private mapToEntity<T extends Video | Blog | Livestream | Course>(Entity: new () => T, data: any[]): T[] {
    return data.map((item) => {
      const entity = new Entity();
      Object.keys(item).forEach((key) => {
        if (key in entity) {
          entity[key] = item[key];
        }
      });

      entity.category = new Category();
      entity.category.id = item.categoryId;
      entity.category.name = item.name;

      const user = new User();
      user.id = item.userId;
      user.firstName = item.firstName;
      user.lastName = item.lastName;
      user.email = item.email;
      user.avatarURL = item.avatarURL;

      if (entity instanceof Video) {
        entity.uploader = user;
      } else if (entity instanceof Blog) {
        entity.user = user;
      } else if (entity instanceof Livestream) {
        entity.streamer = user;
      } else if (entity instanceof Course) {
        entity.creator = user;
      }

      return entity;
    });
  }
}
