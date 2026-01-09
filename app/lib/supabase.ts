import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase API 헬퍼 함수들
export const supabaseApi = {
  // 모든 투도 조회
  async getTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as any[]) || [];
  },

  // 투도 생성
  async createTodo(todo: any) {
    const { data, error } = await supabase
      .from('todos')
      .insert([todo])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 투도 수정
  async updateTodo(id: string, updates: any) {
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 투도 삭제
  async deleteTodo(id: string) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // 사용자 생성
  async createUser(name: string) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ name }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 실시간 투도 구독
  subscribeToTodos(callback: (payload: any) => void) {
    return supabase
      .channel('todos-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        callback
      )
      .subscribe();
  },
};
