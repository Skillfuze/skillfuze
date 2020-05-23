import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as shortid from 'shortid';

import { Livestream as ILivestream } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity()
export class Livestream implements ILivestream {
  @ApiProperty()
  @PrimaryColumn()
  public id: string;

  @ApiProperty()
  @Column({ type: 'text' })
  public title: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  public description: string;

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
  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public streamer: User;

  @ApiProperty()
  @Column({ type: 'simple-array', nullable: true })
  public tags: string[];

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  public streamKey: string;

  @ApiProperty()
  @Column({ default: false })
  public isLive: boolean;

  public constructor() {
    this.id = shortid.generate();
    this.streamKey = shortid.generate();
  }
}
