import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User as IUser, Livestream } from '@skillfuze/types';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import * as shortid from 'shortid';

@Entity()
export class User implements IUser {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column()
  public firstName: string;

  @ApiProperty()
  @Column()
  public lastName: string;

  @ApiProperty()
  @Column()
  public email: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ nullable: true })
  public password: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ nullable: true })
  public oAuthId: string;

  @ApiProperty()
  @Column({ nullable: true })
  public avatarURL: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  public bio: string;

  @ApiProperty()
  @Column({ unique: true })
  public username: string;

  @OneToMany('Livestream', 'streamer')
  public livestreams?: Livestream[];

  public constructor() {
    this.username = `user-${shortid.generate()}`;
  }
}
