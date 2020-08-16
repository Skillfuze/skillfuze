import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Category as ICategory } from '@skillfuze/types';
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

@Entity()
export class Category implements ICategory {
  @IsNotEmpty({ message: 'Category ID should not be empty' })
  @IsNumber()
  @PrimaryGeneratedColumn()
  public id: number;

  @IsOptional()
  @Column()
  public name: string;

  @IsOptional()
  @Column({ nullable: true })
  public slug?: string;
}
