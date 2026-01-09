import { User } from './types';

const STORAGE_KEYS = {
  USER: 'bibe_user',
};

// 로컬 스토리지 매니저 (사용자 정보만 로컬에 저장)
export const storageManager = {
  // 사용자 관리 (localStorage 유지)
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  },

  setUser: (user: User): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // 전체 초기화
  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

// Supabase Todo 타입 변환
export const convertDbTodoToTodo = (dbTodo: any) => ({
  id: dbTodo.id,
  title: dbTodo.title,
  description: dbTodo.description,
  priority: dbTodo.priority,
  dueDate: dbTodo.due_date || '',
  completed: dbTodo.completed,
  createdBy: dbTodo.created_by,
  createdAt: dbTodo.created_at,
});

export const convertTodoToDbTodo = (todo: any) => ({
  title: todo.title,
  description: todo.description,
  priority: todo.priority,
  due_date: todo.dueDate || null,
  completed: todo.completed,
  created_by: todo.createdBy,
  created_at: todo.createdAt,
});
