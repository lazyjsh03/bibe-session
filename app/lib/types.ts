// 투두 항목
export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
  createdBy: string;
  createdAt: string;
}

// 사용자
export interface User {
  id: string;
  name: string;
}
