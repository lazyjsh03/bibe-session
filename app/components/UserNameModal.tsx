'use client';

import { useState } from 'react';

interface UserNameModalProps {
  onSubmit: (username: string) => void;
}

export default function UserNameModal({ onSubmit }: UserNameModalProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }

    if (username.length > 50) {
      setError('이름은 50자 이하여야 합니다.');
      return;
    }

    onSubmit(username.trim());
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>팀 협업 투두앱에 오신 것을 환영합니다!</h2>
        <p>사용할 이름을 입력해주세요.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="이름 입력"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            autoFocus
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">시작하기</button>
        </form>
      </div>
    </div>
  );
}
