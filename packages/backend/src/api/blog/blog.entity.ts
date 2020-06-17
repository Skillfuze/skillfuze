import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as shortid from 'shortid';
import { Blog as IBlog } from '@skillfuze/types';

import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Blog implements IBlog {
  @ApiProperty()
  @PrimaryColumn()
  public id: string;

  @ApiProperty()
  @Column({ unique: true, nullable: true })
  public url: string = undefined;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  public title: string = undefined;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  public description: string = undefined;

  @ApiProperty()
  @Column({ type: 'longtext', nullable: true })
  public content: string = undefined;

  @ApiProperty()
  @Column({ nullable: true })
  public thumbnailURL: string = undefined;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date = undefined;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date = undefined;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  public publishedAt: Date = undefined;

  @Column({ default: 0 })
  public views: number = undefined;

  @ApiProperty()
  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public user: User = undefined;

  @ApiProperty()
  @Column({ type: 'simple-array', nullable: true })
  public tags: string[] = undefined;

  @ManyToOne(/* istanbul ignore next */ () => Category, { nullable: false })
  @JoinColumn({ referencedColumnName: 'id' })
  public category: Category = undefined;

  public constructor() {
    this.id = shortid.generate();
  }
}
