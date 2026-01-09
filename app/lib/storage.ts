import { Todo, User } from './types';

const STORAGE_KEYS = {
  TODOS: 'bibe_todos',
  USER: 'bibe_user',
};

export const storageManager = {
  // 투도 관리
  getTodos: (): Todo[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.TODOS);
    return stored ? JSON.parse(stored) : [];
  },

  setTodos: (todos: Todo[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
  },

  // 사용자 관리
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
    localStorage.removeItem(STORAGE_KEYS.TODOS);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};
