import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CourseLesson as ICourseLesson } from '@skillfuze/types';
import { Exclude } from 'class-transformer';

// eslint-disable-next-line import/no-cycle
import { Course } from './course.entity';
import { Material } from '../../materials/material.entity';

@Entity()
export class CourseLesson implements ICourseLesson {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public order: number;

  @Column()
  public type: 'Blog' | 'Video';

  @Column()
  public materialId: string;

  @Exclude()
  @ManyToOne(() => Course, (course) => course.lessons)
  public course: Course;

  @ManyToOne(() => Material)
  private material: Material;
}
