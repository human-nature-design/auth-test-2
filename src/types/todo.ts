import { Database } from "@/utils/database.types";

/**
 * Todo item type for client use
 * Non-nullable version without internal fields like user_id
 */
export type Todo = {
  id: number;
  task: string;
  is_complete: boolean;
  inserted_at: string;
};

// Type alias for the database row (with nullables and all fields)
export type TodoRow = Database['public']['Tables']['todos']['Row'];
