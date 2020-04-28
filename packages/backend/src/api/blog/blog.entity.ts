import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as shortid from 'shortid';

import { User } from '../users/user.entity';

@Entity()
export class Blog {
  @PrimaryColumn()
  public id: string;

  @Column({ unique: true, nullable: true })
  public url: string;

  @Column({ type: 'text' })
  public title: string;

  @Column({ type: 'text', nullable: true })
  public description: string;

  @Column({ type: 'longtext' })
  public content: string;

  @Column({ nullable: true })
  public thumbnailURL: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public publishedAt: Date;

  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public user: User;

  @Column({ type: 'simple-array', nullable: true })
  public tags: string[];

  public constructor() {
    this.id = shortid.generate();
  }
}
