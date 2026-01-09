'use client';

import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import UserNameModal from './components/UserNameModal';
import { Todo, User } from './lib/types';
import { storageManager, convertDbTodoToTodo } from './lib/storage';
import { supabaseApi } from './lib/supabase';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 초기 로드 및 실시간 구독
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 1. 사용자 정보 로드
        const savedUser = storageManager.getUser();
        if (savedUser) {
          setUser(savedUser);
          setShowUserModal(false);
        }

        // 2. Supabase에서 투도 로드
        const dbTodos = await supabaseApi.getTodos();
        const convertedTodos = dbTodos.map(convertDbTodoToTodo);
        setTodos(convertedTodos);

        // 3. 실시간 구독 설정
        const subscription = supabaseApi.subscribeToTodos((payload: any) => {
          if (payload.eventType === 'INSERT') {
            const newTodo = convertDbTodoToTodo(payload.new);
            setTodos((prev) => [newTodo, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedTodo = convertDbTodoToTodo(payload.new);
            setTodos((prev) =>
              prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
            );
          } else if (payload.eventType === 'DELETE') {
            setTodos((prev) => prev.filter((todo) => todo.id !== payload.old.id));
          }
        });

        setLoading(false);

        // 정리 함수
        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error('초기화 오류:', err);
        setError('데이터를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // 사용자명 저장
  const handleSetUsername = (username: string) => {
    const newUser: User = { id: Date.now().toString(), name: username };
    storageManager.setUser(newUser);
    setUser(newUser);
    setShowUserModal(false);
  };

  // 투도 추가
  const handleAddTodo = async (
    title: string,
    description: string,
    priority: 'high' | 'medium' | 'low',
    dueDate: string
  ) => {
    try {
      const newTodoData = {
        title,
        description,
        priority,
        due_date: dueDate || null,
        completed: false,
        created_by: user?.name || '익명',
        created_at: new Date().toISOString(),
      };

      // Supabase에 추가
      const dbTodo = await supabaseApi.createTodo(newTodoData);
      const newTodo = convertDbTodoToTodo(dbTodo);

      // 로컬 상태 업데이트 (실시간 구독이 처리하지만 즉시 반영을 위해)
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error('투도 추가 오류:', err);
      setError('투도를 추가하는데 실패했습니다.');
    }
  };

  // 투도 수정
  const handleUpdateTodo = async (
    id: string,
    updates: Partial<Todo>
  ) => {
    try {
      const dbUpdates: any = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
      if (updates.dueDate !== undefined) dbUpdates.due_date = updates.dueDate || null;
      if (updates.completed !== undefined) dbUpdates.completed = updates.completed;

      // Supabase 업데이트
      const dbTodo = await supabaseApi.updateTodo(id, dbUpdates);
      const updatedTodo = convertDbTodoToTodo(dbTodo);

      // 로컬 상태 업데이트
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      console.error('투도 수정 오류:', err);
      setError('투도를 수정하는데 실패했습니다.');
    }
  };

  // 투도 삭제
  const handleDeleteTodo = async (id: string) => {
    try {
      // Supabase 삭제
      await supabaseApi.deleteTodo(id);

      // 로컬 상태 업데이트
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('투도 삭제 오류:', err);
      setError('투도를 삭제하는데 실패했습니다.');
    }
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
        <h1>팀 협업 투두앱 (Supabase 연동)</h1>
        {user && <p>사용자: {user.name}</p>}
      </header>

      <main className="main">
        {loading && <p className="loading">데이터를 불러오는 중...</p>}
        {error && <p className="error" style={{ marginBottom: '20px' }}>{error}</p>}

        <TodoForm onAddTodo={handleAddTodo} disabled={loading} />

        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
            disabled={loading}
          >
            전체 ({todos.length})
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
            disabled={loading}
          >
            진행중 ({todos.filter((t) => !t.completed).length})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
            disabled={loading}
          >
            완료 ({todos.filter((t) => t.completed).length})
          </button>
        </div>

        {!loading && (
          <TodoList
            todos={filteredTodos}
            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        )}
      </main>
    </div>
  );
}
