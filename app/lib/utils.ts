// 우선순위별 색상
export const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'high':
      return '#ff4444';
    case 'medium':
      return '#ff8800';
    case 'low':
      return '#4488ff';
    default:
      return '#999999';
  }
};

// 마감일이 지났는지 확인
export const isOverdue = (dueDate: string, completed: boolean): boolean => {
  if (!dueDate || completed) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  return due < today;
};

// 날짜 포맷
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return date.toLocaleDateString('ko-KR', options);
};

// 마감일이 오늘인지 확인
export const isDueToday = (dueDate: string): boolean => {
  if (!dueDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  return due.getTime() === today.getTime();
};

// 마감일이 내일인지 확인
export const isDueTomorrow = (dueDate: string): boolean => {
  if (!dueDate) return false;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  return due.getTime() === tomorrow.getTime();
};
