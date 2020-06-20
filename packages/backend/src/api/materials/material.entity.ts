import { PrimaryColumn, Entity } from 'typeorm';

@Entity()
export abstract class Material {
  @PrimaryColumn()
  public id: string;

  public constructor(id: string) {
    this.id = id;
  }
}
