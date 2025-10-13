"use server";

import { createClient } from "@/utils/supabase/server";
import type { Todo } from "@/types";

export async function getTodos(): Promise<Todo[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("todos")
    .select("id, task, is_complete, inserted_at")
    .eq("user_id", user.id)
    .order("id", { ascending: false });

  if (error) {
    console.error("Failed to fetch todos:", error);
    return [];
  }

  return data || [];
}

export async function addTodo(task: string) : Promise<Todo> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("todos")
    .insert({ task, user_id: user.id })
    .select("id, task, is_complete, inserted_at")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteTodo(id: number) : Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}

export async function completeTodo(id: number, done: boolean) : Promise<Todo> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("todos")
    .update({ is_complete: done })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id, task, is_complete, inserted_at")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Todo not found or access denied");
  return data;
}
