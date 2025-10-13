import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { getTodos, addTodo, deleteTodo, completeTodo } from "./actions";
import MyTodos from "@/ui/layouts/Todo-page";


export default async function TodoPage() {
  const todos = await getTodos();


  return (
    <DefaultPageLayout>
    <MyTodos
      initialTodos={todos}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      completeTodo={completeTodo}
    />
    </DefaultPageLayout>
  );
}
