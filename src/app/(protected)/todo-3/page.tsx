import { getTodos } from "./actions";
import TodoListClient from "./todo-component";

export default async function TodoPage() {
  const todos = await getTodos();

  return <TodoListClient initialTodos={todos} />;
}
