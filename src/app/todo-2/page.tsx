import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Todo2 from "@/components/todo-2";

export default async function TodosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { data: todos, error } = await supabase
    .from("todos")
    .select("id, task, is_complete, inserted_at")   // avoid select("*")
    .eq("user_id", user.id)
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);

  return <Todo2 initialTodos={todos ?? []} />;
}
