import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Todo2 from "@/components/todo-2";
import LogoutButton from "@/components/logout-button";

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

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <Todo2 initialTodos={todos ?? []} />
      <div><LogoutButton/></div>
    </div>
  );
    
}
