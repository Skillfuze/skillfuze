import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  OneToOne,
  BeforeInsert,
  getManager,
} from 'typeorm';
import * as shortid from 'shortid';
import { Video as IVideo } from '@skillfuze/types';

import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Material } from '../materials/material.entity';

@Entity()
export class Video implements IVideo {
  @PrimaryColumn()
  public id: string;

  @OneToOne(() => Material, { cascade: true })
  @JoinColumn({ name: 'id' })
  private material: Material;

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

  @DeleteDateColumn({ type: 'timestamp' })
  public deletedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date = undefined;

  @Column({ default: 0 })
  public views: number = undefined;

  @Column({ type: 'simple-array' })
  public tags: string[] = [];

  @ManyToOne(/* istanbul ignore next */ () => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public uploader: User = undefined;

  @ManyToOne(/* istanbul ignore next */ () => Category, { nullable: false })
  @JoinColumn({ referencedColumnName: 'id' })
  public category: Category = undefined;

  public constructor() {
    this.id = shortid.generate();
  }

  @BeforeInsert()
  private async saveMaterial(): Promise<void> {
    await getManager().save(Material, { id: this.id });
  }
}
