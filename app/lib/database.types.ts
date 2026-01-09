export type Database = {
  public: {
    Tables: {
      todos: {
        Row: {
          id: string;
          title: string;
          description: string;
          priority: 'high' | 'medium' | 'low';
          due_date: string | null;
          completed: boolean;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          priority: 'high' | 'medium' | 'low';
          due_date?: string | null;
          completed?: boolean;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          priority?: 'high' | 'medium' | 'low';
          due_date?: string | null;
          completed?: boolean;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
