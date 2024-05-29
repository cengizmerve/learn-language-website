export interface UserProgress {
  id: number;
  userId: number;
  courseId: number;
  courseName: string;
  completedLessons: number;
  completedQuizzes: number;
  totalLessons: number;
  totalQuizzes: number;
}
