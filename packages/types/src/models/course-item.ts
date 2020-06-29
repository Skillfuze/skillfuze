export interface CourseLesson {
  id: number;
  title: string;
  order: number;
  type: 'Blog' | 'Video';
  materialId: string;
}
