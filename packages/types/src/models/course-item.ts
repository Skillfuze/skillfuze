export interface CourseLesson {
  id: string;
  title: string;
  order: number;
  type: 'Blog' | 'Video';
  materialId: string;
}
