"use client";

import { useState } from "react";
import { addTodo, deleteTodo, completeTodo, Todo } from "@/app/todo-2/actions";
import { CheckboxCard } from "@/ui/components/CheckboxCard";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherX } from "@subframe/core";


export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTask, setNewTask] = useState("");


  async function onAdd(task: string) {
    if (task.trim().length <= 3) 
        return;

    try {
      const created = await addTodo(task);
      setTodos((t) => [created, ...t]);
      setNewTask("");
    } catch (err) {
      console.error("Add failed:", err);
      alert("Couldn't add todo. Try again.");
    }
  }

  async function onDelete(id: number) {
    // optimistic UI
    const prev = todos;
    setTodos((t) => t.filter((x) => x.id !== id));

    try {
      await deleteTodo(id);
    } catch (err) {
      console.error("Delete failed:", err); // shows in terminal if thrown on server
      setTodos(prev);
      // rollback UI
      alert("Couldn't delete this item. Try again.");
    }
  }

  async function onComplete(id: number, next: boolean) {
    // optimistic UI
    const prev = todos;
    setTodos((t) =>
      t.map((todo) =>
        todo.id === id ? { ...todo, is_complete: next } : todo
      )
    );

    try {
      await completeTodo(id, next);
    } catch (err) {
      console.error("Complete failed:", err);
      setTodos(prev);
      alert("Couldn't update this item. Try again.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 w-full">
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

        />
        <button
          type="submit"
          disabled={ newTask.trim().length <= 3}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add Todo
        </button>
      </form>

      {/* Todo list */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <CheckboxCard
            key={todo.id}
            className="w-max"
            checked={todo.is_complete}
            onCheckedChange={(checked: boolean) => onComplete(todo.id, checked)}
          >
            <span className={`text-body-bold font-body-bold text-default-font ${todo.is_complete ? "line-through" : ""}`}>
              {todo.task}
            </span>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-2 py-2">
              <span className="text-monospace-body font-monospace-body text-default-font text-right">
                {todo.id}
              </span>
            </div>
            <IconButton
              className="hover:shadow-md hover:shadow-md:hover transition-shadow"
              variant="neutral-secondary"
              size="small"
              icon={<FeatherX />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => onDelete(todo.id)}
            />
          </CheckboxCard>
        ))}
      </div>
    </div>
  );
}