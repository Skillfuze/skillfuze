import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  public id: number;

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

  @ManyToOne(() => User, { nullable: false })
  public user: User;

  @Column({ type: 'simple-array', nullable: true })
  public tags: string[];
}
