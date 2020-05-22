/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User as IUser } from '@skillfuze/types';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

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
  @Column({ unique: true })
  public email: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  public password: string;
}
