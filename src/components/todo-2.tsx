"use client";

  import { useState, useTransition } from "react";
  import { addTodo, deleteTodo, toggleTodo } from
  "@/app/todo-2/actions";

  type Todo = {
    id: number;
    task: string;
    is_complete: boolean;
    inserted_at: string;
  };

  export default function TodoList({ initialTodos }: { 
  initialTodos: Todo[] }) {
    const [todos, setTodos] = useState(initialTodos);
    const [newTask, setNewTask] = useState("");
    const [isPending, startTransition] = useTransition();

    function onAdd(task: string) {
        const run = async () => {
          const created = await addTodo(task);
          setTodos((t) => [created, ...t]);
          setNewTask("");
        };

        // log the task being added to the console
        console.log("task", task);
        // startTransition expects a sync callback
        startTransition(() => {
          run(); // call async function, but don't return the promise
        });
      }
      

    function onDelete(id: number) {
      startTransition(async () => {
        await deleteTodo(id);
        setTodos((t) => t.filter((x) => x.id !== id));
      });
    }

    function onToggle(id: number, next: boolean) {
      startTransition(async () => {
        const updated = await toggleTodo(id, next);
        setTodos((t) => t.map((x) => (x.id === id ? updated :
   x)));
      });
    }

    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Todos</h1>

        {/* Add todo form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newTask.trim().length > 3) onAdd(newTask);
          }}
          className="mb-6"
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task (min 4 chars)..."
            className="border rounded px-3 py-2 w-full"
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending || newTask.trim().length <= 
  3}
            className="mt-2 bg-blue-500 text-white px-4 py-2 
  rounded disabled:opacity-50"
          >
            Add Todo
          </button>
        </form>

        {/* Todo list */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center 
  gap-2 border p-2 rounded">
              <input
                type="checkbox"
                checked={todo.is_complete}
                onChange={(e) => onToggle(todo.id,
  e.target.checked)}
                disabled={isPending}
              />
              <span className={todo.is_complete ? 
  "line-through" : ""}>
                {todo.task}
              </span>
              <button
                onClick={() => onDelete(todo.id)}
                disabled={isPending}
                className="ml-auto text-red-500
  hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }