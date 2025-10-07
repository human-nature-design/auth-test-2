"use server";

import { createClient } from "@/utils/supabase/server";

export async function addTodo(task: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("todos")
    .insert({ task, user_id: user.id })
    .select("id, task, is_complete, inserted_at")
    .single();

  if (error) throw new Error(error.message);

  // log the task being added to the console
  console.log("task", task);
  return data;
}

export async function deleteTodo(id: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  console.log("task", data);
  return data;
}

export async function completeTodo(id: number, done: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("todos")
    .update({ is_complete: true })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id, task, is_complete, inserted_at")
    .single();

  if (error) throw new Error(error.message);
  return data;
}
