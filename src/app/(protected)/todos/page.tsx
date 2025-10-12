import { getTodos, addTodo, deleteTodo, completeTodo } from "./actions";
import MyTodos from "@/ui/layouts/Todo";

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <MyTodos
      initialTodos={todos}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      completeTodo={completeTodo}
    />
  );
}
