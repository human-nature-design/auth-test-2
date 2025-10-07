import { getTodos } from "./actions";
import TodoListClient from "./TodoListClient";

export default async function TodoPage() {
  const todos = await getTodos();

  return <TodoListClient initialTodos={todos} />;
}
