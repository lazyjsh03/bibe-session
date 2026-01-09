# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙
- 기본 응답: 한국어
- 코드 주석: 한국어로 작성
- 커밋 메시지: 한국어로 작성
- 문서화: 한국어로 작성
- 변수명/함수명: 영어 (코드 표준 준수)

## 프로젝트 개요

팀 협업 투두앱(bibe-session) - 소규모 팀이 함께 작업 항목을 관리할 수 있는 웹 기반의 작업 관리 도구입니다.

## 기술 스택

- **프레임워크**: Next.js 16+
- **언어**: TypeScript
- **상태 관리**: React Hooks (로컬 상태)
- **저장소**: localStorage (MVP)
- **스타일**: CSS (모던 디자인 시스템)

## 프로젝트 구조

```
app/
├── api/              # API 라우트 (향후 서버 기능)
│   └── todos/       # 투도 관련 API
├── components/      # React 컴포넌트
│   ├── TodoForm.tsx        # 투도 입력 폼
│   ├── TodoList.tsx        # 투도 목록
│   ├── TodoItem.tsx        # 투도 항목
│   └── UserNameModal.tsx   # 사용자명 입력 모달
├── lib/             # 유틸리티 및 헬퍼
│   ├── types.ts     # TypeScript 타입 정의
│   ├── storage.ts   # localStorage 관리
│   └── utils.ts     # 날짜, 우선순위 등 유틸리티
├── styles/          # 전역 CSS
│   └── globals.css  # 전체 스타일시트
├── layout.tsx       # 루트 레이아웃
└── page.tsx         # 메인 페이지 (투도 앱)
```

## 개발 명령어

### 개발 서버 실행
```bash
npm run dev
```
개발 서버를 실행합니다. http://localhost:3000 에서 접속 가능합니다.

### 빌드
```bash
npm run build
```
프로덕션용으로 빌드합니다.

### 프로덕션 서버 실행
```bash
npm run start
```
빌드된 앱을 프로덕션 모드로 실행합니다.

### 린트
```bash
npm run lint
```
ESLint를 실행하여 코드 품질을 검사합니다.

## 아키텍처 및 핵심 설계

### 상태 관리
- **로컬 상태**: React Hooks (useState)를 사용하여 투도 목록 관리
- **영속성**: localStorage를 통한 데이터 영속화
- **storageManager**: `app/lib/storage.ts`에서 일관된 저장소 접근 제공

### 데이터 구조

#### Todo
```typescript
interface Todo {
  id: string;                          // 고유 ID (타임스탬프 기반)
  title: string;                       // 제목 (1-100자)
  description: string;                 // 설명 (0-500자)
  priority: 'high' | 'medium' | 'low'; // 우선순위
  dueDate: string;                     // 마감일 (YYYY-MM-DD)
  completed: boolean;                  // 완료 여부
  createdBy: string;                   // 생성자명
  createdAt: string;                   // 생성 시간 (ISO string)
}
```

#### User
```typescript
interface User {
  id: string;   // 고유 ID (타임스탬프 기반)
  name: string; // 사용자명 (1-50자)
}
```

### 컴포넌트 계층

1. **page.tsx (메인 페이지)**
   - 전체 상태 관리 (todos, user, filter)
   - localStorage와의 동기화
   - 자식 컴포넌트에 props 전달

2. **UserNameModal (사용자명 입력)**
   - 초기 접속 시 사용자명 입력
   - localStorage에 저장

3. **TodoForm (투도 입력 폼)**
   - 새 투도 생성 인터페이스
   - 유효성 검사 (제목 필수, 길이 제한)

4. **TodoList (투도 목록)**
   - 필터된 투도 목록 렌더링
   - TodoItem 컴포넌트 매핑

5. **TodoItem (투도 항목)**
   - 개별 투도 표시
   - 완료/수정/삭제 기능
   - 우선순위, 마감일 표시

### 주요 기능

#### MVP 기능 (v1.0)
1. **투도 CRUD**: 생성, 읽기, 수정, 삭제
2. **완료 표시**: 체크박스로 완료 상태 관리
3. **우선순위**: 높음(🔴)/중간(🟠)/낮음(🔵) 3단계
4. **마감일**: 날짜 선택 및 표시
5. **필터링**: 전체/진행중/완료 탭
6. **사용자 관리**: 닉네임 설정 (로컬)

#### 향후 기능 (Phase 2+)
- 클라우드 동기화 (Firebase/Supabase)
- 다중 사용자 협업 (실시간 업데이트)
- 태스크 할당
- 댓글/노트
- 알림
- 모바일 앱

## 개발 시 주의사항

### localStorage 접근
- `storageManager` 사용 (app/lib/storage.ts)
- SSR 환경에서의 `window` 객체 확인 필수
- `'use client'` 지시어 필요한 컴포넌트 표시

### TypeScript
- 모든 새로운 타입은 `app/lib/types.ts`에 정의
- 컴포넌트의 Props 인터페이스 명시

### 스타일링
- `app/styles/globals.css`에 CSS 변수 정의
- 반응형 디자인 고려 (모바일 우선)
- BEM 네이밍 컨벤션 참고

### 컴포넌트 작성
- 'use client' 마크를 필요한 곳에 추가
- Props 검증 및 기본값 설정
- 에러 처리 및 유효성 검사 포함
