import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as shortid from 'shortid';
import { Video as IVideo } from '@skillfuze/types';

import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Video implements IVideo {
  @PrimaryColumn()
  public id: string;

  @Column({ type: 'text' })
  public title: string = undefined;

  @Column({ type: 'text', nullable: true })
  public description: string = undefined;

  @Column({ nullable: true })
  public thumbnailURL: string = undefined;

  @Column({ nullable: false })
  public url: string = undefined;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date = undefined;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date = undefined;

  @Column({ type: 'simple-array', nullable: true })
  public tags: string[] = undefined;

  @Column({ default: 0 })
  public views: number = undefined;

  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public uploader: User = undefined;

  @ManyToOne(/* istanbul ignore next */ () => Category, { nullable: false })
  @JoinColumn({ referencedColumnName: 'id' })
  public category: Category = undefined;

  public constructor() {
    this.id = shortid.generate();
  }
}
