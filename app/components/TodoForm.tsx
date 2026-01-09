'use client';

import { useState } from 'react';

interface TodoFormProps {
  onAddTodo: (
    title: string,
    description: string,
    priority: 'high' | 'medium' | 'low',
    dueDate: string
  ) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }

    if (title.length > 100) {
      setError('제목은 100자 이하여야 합니다.');
      return;
    }

    if (description.length > 500) {
      setError('설명은 500자 이하여야 합니다.');
      return;
    }

    onAddTodo(title.trim(), description.trim(), priority, dueDate);

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setError('');
  };

  return (
    <div className="todo-form">
      <h2>새 투도 추가</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목 *</label>
          <input
            id="title"
            type="text"
            placeholder="투도 제목을 입력하세요"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            maxLength={100}
          />
          <span className="char-count">{title.length}/100</span>
        </div>

        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            placeholder="투도 설명 (선택사항)"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError('');
            }}
            maxLength={500}
            rows={3}
          />
          <span className="char-count">{description.length}/500</span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">우선순위</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as 'high' | 'medium' | 'low')
              }
            >
              <option value="high">높음 🔴</option>
              <option value="medium">중간 🟠</option>
              <option value="low">낮음 🔵</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">마감일</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                setError('');
              }}
            />
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-primary">
          투도 추가
        </button>
      </form>
    </div>
  );
}
