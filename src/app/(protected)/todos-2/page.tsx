import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { getTodos, addTodo, deleteTodo, completeTodo } from "./actions";
import MyTodos from "@/ui/layouts/Todo-page";
import { createClient } from "@/utils/supabase/server";


export default async function TodoPage() {
  const todos = await getTodos();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <DefaultPageLayout userNameSlot={user?.email}>
    <MyTodos
      initialTodos={todos}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      completeTodo={completeTodo}
    />
    </DefaultPageLayout>
  );
}
