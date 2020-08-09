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
  getManager,
  BeforeInsert,
} from 'typeorm';
import * as shortid from 'shortid';

import { Livestream as ILivestream, User } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../categories/category.entity';
import { Material } from '../materials/material.entity';

@Entity()
export class Livestream implements ILivestream {
  @ApiProperty()
  @PrimaryColumn()
  public id: string;

  @OneToOne(() => Material, { cascade: true })
  @JoinColumn({ name: 'id' })
  private material: Material;

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

  @DeleteDateColumn({ type: 'timestamp' })
  public deletedAt: Date;

  @ApiProperty()
  @ManyToOne(/* istanbul ignore next */ 'User', { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  public streamer: User;

  @ApiProperty()
  @Column({ type: 'simple-array' })
  public tags: string[] = [];

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  public streamKey: string;

  @ApiProperty()
  @Column({ default: false })
  public isLive: boolean;

  @ManyToOne(/* istanbul ignore next */ () => Category, { nullable: false })
  @JoinColumn({ referencedColumnName: 'id' })
  public category: Category;

  public constructor() {
    this.id = shortid.generate();
    this.streamKey = shortid.generate();
  }

  @BeforeInsert()
  private async saveMaterial(): Promise<void> {
    await getManager().save(Material, { id: this.id });
  }
}
