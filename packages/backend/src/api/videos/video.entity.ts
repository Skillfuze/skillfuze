import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import * as shortid from 'shortid';
import { Video as IVideo } from '@skillfuze/types';

import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Video implements IVideo {
  @PrimaryColumn()
  public id: string;

  @Column({ type: 'text' })
  public title: string;

  @Column({ type: 'text', nullable: true })
  public description: string;

  @Column({ nullable: true })
  public thumbnailURL: string;

  @Column({ nullable: false })
  public url: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  public deletedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column({ type: 'simple-array' })
  public tags: string[] = [];

  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public uploader: User;

  @ManyToOne(/* istanbul ignore next */ () => Category, { nullable: false })
  @JoinColumn({ referencedColumnName: 'id' })
  public category: Category;

  public constructor() {
    this.id = shortid.generate();
  }
}
