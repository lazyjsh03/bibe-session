'use client';

import { Todo } from '../lib/types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, updates: Partial<Todo>) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoList({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>투도가 없습니다. 새로운 투도를 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
}
