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
  public url: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  public title: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  public description: string;

  @ApiProperty()
  @Column({ type: 'longtext', nullable: true })
  public content: string;

  @ApiProperty()
  @Column({ nullable: true })
  public thumbnailURL: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  public publishedAt: Date;

  @ApiProperty()
  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public user: User;

  @ApiProperty()
  @Column({ type: 'simple-array' })
  public tags: string[] = [];

  @ManyToOne(/* istanbul ignore next */ () => Category, { nullable: false })
  @JoinColumn({ referencedColumnName: 'id' })
  public category: Category;

  public constructor() {
    this.id = shortid.generate();
  }
}
