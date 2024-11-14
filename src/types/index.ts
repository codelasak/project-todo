export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Düşük' | 'Orta' | 'Yüksek';
  category: string;
  dueDate: string;
  completed: boolean;
  subTasks: SubTask[];
}