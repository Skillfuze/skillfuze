import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import shortid from 'shortid';
import { Course as ICourse } from '@skillfuze/types';

// eslint-disable-next-line import/no-cycle
import { CourseLesson } from './course-item.entity';
import { Category } from '../../categories/category.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Course implements ICourse {
  @PrimaryColumn()
  public id: string;

  @Column({ nullable: true })
  public title: string = undefined;

  @Column({ unique: true, nullable: true })
  public slug: string = undefined;

  @Column({ nullable: true, type: 'text' })
  public description: string = undefined;

  @ManyToOne(/* istanbul ignore next */ () => Category, { nullable: true, eager: true })
  @JoinColumn({ referencedColumnName: 'id' })
  public category: Category;

  @Column({ type: 'simple-array', nullable: true })
  public tags: string[] = undefined;

  @Column({ nullable: true })
  public thumbnailURL: string = undefined;

  @Column({ nullable: true })
  public trailerURL: string = undefined;

  @Column({ default: 0 })
  public price: number = undefined;

  @OneToMany(() => CourseLesson, (lesson) => lesson.course, { cascade: true, eager: true })
  public lessons: CourseLesson[];

  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE', eager: true })
  @JoinColumn({ referencedColumnName: 'id' })
  public creator: User;

  @ManyToMany(() => User)
  @JoinTable()
  public enrolled: User[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date = undefined;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date = undefined;

  @DeleteDateColumn({ type: 'timestamp' })
  public deletedAt: Date = undefined;

  @Column({ type: 'timestamp', nullable: true })
  public publishedAt: Date = undefined;

  public constructor() {
    this.id = shortid.generate();
  }
}
