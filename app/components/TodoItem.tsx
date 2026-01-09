'use client';

import { useState } from 'react';
import { Todo } from '../lib/types';
import { getPriorityColor, isOverdue, formatDate } from '../lib/utils';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate);

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      dueDate: editDueDate,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate);
    setIsEditing(false);
  };

  const overdue = isOverdue(todo.dueDate, todo.completed);

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="제목"
            maxLength={100}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="설명"
            maxLength={500}
            rows={2}
          />
          <div className="edit-row">
            <select
              value={editPriority}
              onChange={(e) =>
                setEditPriority(e.target.value as 'high' | 'medium' | 'low')
              }
            >
              <option value="high">높음 🔴</option>
              <option value="medium">중간 🟠</option>
              <option value="low">낮음 🔵</option>
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          </div>
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>
              저장
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`todo-item ${todo.completed ? 'completed' : ''} ${
        overdue ? 'overdue' : ''
      }`}
    >
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onUpdate(todo.id, { completed: e.target.checked })}
        />
      </div>

      <div className="todo-content">
        <div className="todo-header">
          <h3 className={todo.completed ? 'strikethrough' : ''}>
            {todo.title}
          </h3>
          <span className={`priority-badge priority-${todo.priority}`}>
            {todo.priority === 'high' && '🔴 높음'}
            {todo.priority === 'medium' && '🟠 중간'}
            {todo.priority === 'low' && '🔵 낮음'}
          </span>
        </div>

        {todo.description && <p className="todo-description">{todo.description}</p>}

        <div className="todo-meta">
          <span className="creator">생성자: {todo.createdBy}</span>
          {todo.dueDate && (
            <span className={`due-date ${overdue ? 'overdue-text' : ''}`}>
              📅 {formatDate(todo.dueDate)}
              {overdue && ' (연체)'}
            </span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="btn-edit"
          onClick={() => setIsEditing(true)}
          title="수정"
        >
          ✏️
        </button>
        <button
          className="btn-delete"
          onClick={() => {
            if (confirm('정말 삭제하시겠습니까?')) {
              onDelete(todo.id);
            }
          }}
          title="삭제"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
