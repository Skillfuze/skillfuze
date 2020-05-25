export interface CreateVideoDTO {
  title: string;
  description?: string;
  thumbnailURL?: string;
  url: string;
  tags?: string[];
}
