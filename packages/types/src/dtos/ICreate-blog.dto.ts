/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface ICreateBlogDTO {
  title: string;
  description?: string;
  content: string;
  thumbnailURL?: string;
  tags?: string[];
}
