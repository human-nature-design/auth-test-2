import LogoutButton from "@/components/logout-button";
import { getTodos } from "./actions";
import TodoListClient from "./Todo-component";

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <>
      <TodoListClient initialTodos={todos} />
      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </>
  );
}
