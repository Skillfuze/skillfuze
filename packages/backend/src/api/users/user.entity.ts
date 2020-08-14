import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    joinColumn: { name: 'followedId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followerId', referencedColumnName: 'id' },
    name: 'user_followers',
  })
  public followers: User[];

  @ManyToMany(() => User)
  @JoinTable({
    joinColumn: { name: 'followerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followedId', referencedColumnName: 'id' },
    name: 'user_followers',
  })
  public following: User[];

  public constructor() {
    this.username = `user-${shortid.generate()}`;
  }
}
