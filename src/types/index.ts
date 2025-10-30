export type TaskPriority = 'rendah' | 'sedang' | 'tinggi';
export type TaskStatus = 'belum' | 'proses' | 'selesai';
export type TaskCategory = 'pekerjaan' | 'pribadi' | 'belajar' | 'lainnya';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}

export interface Stats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}
