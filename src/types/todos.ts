import type { Tables } from "@/utils/database.types";

export type Todo = Pick<
  Tables<"todos">,
  "id" | "task" | "is_complete" | "inserted_at"
>;
