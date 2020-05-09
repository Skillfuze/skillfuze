import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as shortid from 'shortid';

import { ILivestream } from '@skillfuze/types';
import { User } from '../users/user.entity';

@Entity()
export class Livestream implements ILivestream {
  @PrimaryColumn()
  public id: string;

  @Column({ type: 'text' })
  public title: string;

  @Column({ type: 'text', nullable: true })
  public description: string;

  @Column({ nullable: true })
  public thumbnailURL: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public streamer: User;

  @Column({ type: 'simple-array', nullable: true })
  public tags: string[];

  @Column({ nullable: true, unique: true })
  public streamKey: string;

  @Column({ default: false })
  public isLive: boolean;

  public constructor() {
    this.id = shortid.generate();
    this.streamKey = shortid.generate();
  }
}
