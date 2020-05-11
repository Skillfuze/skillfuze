/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';

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

  @Column()
  public password: string;
}
