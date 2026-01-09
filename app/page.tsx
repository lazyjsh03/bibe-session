'use client';

import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import UserNameModal from './components/UserNameModal';
import { Todo, User } from './lib/types';
import { storageManager } from './lib/storage';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 초기 로드
  useEffect(() => {
    const savedUser = storageManager.getUser();
    const savedTodos = storageManager.getTodos();

    if (savedUser) {
      setUser(savedUser);
      setShowUserModal(false);
    }

    setTodos(savedTodos);
  }, []);

  // 사용자명 저장
  const handleSetUsername = (username: string) => {
    const newUser: User = { id: Date.now().toString(), name: username };
    storageManager.setUser(newUser);
    setUser(newUser);
    setShowUserModal(false);
  };

  // 투도 추가
  const handleAddTodo = (
    title: string,
    description: string,
    priority: 'high' | 'medium' | 'low',
    dueDate: string
  ) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      dueDate,
      completed: false,
      createdBy: user?.name || '익명',
      createdAt: new Date().toISOString(),
    };

    const updatedTodos = [newTodo, ...todos];
    storageManager.setTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  // 투도 수정
  const handleUpdateTodo = (
    id: string,
    updates: Partial<Todo>
  ) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updates } : todo
    );
    storageManager.setTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  // 투도 삭제
  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    storageManager.setTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  // 필터링된 투도
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="container">
      {showUserModal && <UserNameModal onSubmit={handleSetUsername} />}

      <header className="header">
        <h1>팀 협업 투두앱</h1>
        {user && <p>사용자: {user.name}</p>}
      </header>

      <main className="main">
        <TodoForm onAddTodo={handleAddTodo} />

        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            전체 ({todos.length})
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            진행중 ({todos.filter((t) => !t.completed).length})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            완료 ({todos.filter((t) => t.completed).length})
          </button>
        </div>

        <TodoList
          todos={filteredTodos}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </main>
    </div>
  );
}
