import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as shortid from 'shortid';

import { User } from '../users/user.entity';

@Entity()
export class Video {
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

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column({ type: 'simple-array', nullable: true })
  public tags: string[];

  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public uploader: User;

  public constructor() {
    this.id = shortid.generate();
  }
}
