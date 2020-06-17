import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as shortid from 'shortid';

import { Livestream as ILivestream } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Livestream implements ILivestream {
  @ApiProperty()
  @PrimaryColumn()
  public id: string;

  @ApiProperty()
  @Column({ type: 'text' })
  public title: string = undefined;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  public description: string = undefined;

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
  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public streamer: User = undefined;

  @ApiProperty()
  @Column({ type: 'simple-array', nullable: true })
  public tags: string[] = undefined;

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  public streamKey: string = undefined;

  @ApiProperty()
  @Column({ default: false })
  public isLive: boolean = undefined;

  @Column({ default: 0 })
  public watchingNow: number = undefined;

  @ManyToOne(/* istanbul ignore next */ () => Category, { nullable: false })
  @JoinColumn({ referencedColumnName: 'id' })
  public category: Category = undefined;

  public constructor() {
    this.id = shortid.generate();
    this.streamKey = shortid.generate();
  }
}
