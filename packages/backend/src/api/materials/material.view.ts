import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
  SELECT id, 'Blog' type, content, NULL url FROM blog
  UNION
  SELECT id, 'Video' type, NULL content, url FROM video
  UNION
  SELECT id, 'Livestream' type, NULL content, NULL url FROM livestream
    `,
})
export class MaterialView {
  @ViewColumn()
  public id: string;

  @ViewColumn()
  public content?: string;

  @ViewColumn()
  public url?: string;

  @ViewColumn()
  public type: 'Blog' | 'Video' | 'Livestream';
}
