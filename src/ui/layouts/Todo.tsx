"use client";

import React, { useState } from "react";
import { Button } from "@/ui/components/Button";
import { Checkbox } from "@/ui/components/Checkbox";
import { IconButton } from "@/ui/components/IconButton";
import { TextField } from "@/ui/components/TextField";
import { FeatherX, FeatherPlusCircle } from "@subframe/core";
import UserProfileSettings from "@/ui/components/user-profile-settings";
import type { Todo } from "@/types";

type MyTodosProps = {
  initialTodos?: Todo[];
  addTodo: (task: string) => Promise<Todo>;
  deleteTodo: (id: number) => Promise<void>;
  completeTodo: (id: number, done: boolean) => Promise<Todo>;
};

export default function MyTodos({
  initialTodos = [],
  addTodo,
  deleteTodo,
  completeTodo
}: MyTodosProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTask, setNewTask] = useState("");

  async function onAdd() {
    if (newTask.trim().length <= 3) return;

    try {
      const created = await addTodo(newTask);
      setTodos((t) => [created, ...t]);
      setNewTask("");
    } catch (err) {
      console.error("Add failed:", err);
      alert("Couldn't add todo. Try again.");
    }
  }

  async function onDelete(id: number) {
    const prev = todos;
    setTodos((t) => t.filter((x) => x.id !== id));

    try {
      await deleteTodo(id);
    } catch (err) {
      console.error("Delete failed:", err);
      setTodos(prev);
      alert("Couldn't delete this item. Try again.");
    }
  }

  async function onComplete(id: number, next: boolean) {
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
    <div className="container max-w-none flex h-full w-full flex-col items-start gap-4 bg-default-background py-12">
      <div className="flex w-full items-center justify-between">
        <span className="text-heading-2 font-heading-2 text-default-font">
          My Tasks
        </span>
        <UserProfileSettings />
      </div>
      <div className="flex w-full items-center gap-2">
        <TextField
          className="h-auto grow shrink-0 basis-0"
          label=""
          helpText=""
        >
          <TextField.Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewTask(event.target.value);
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                onAdd();
              }
            }}
          />
        </TextField>
        <Button 
          variant="neutral-secondary"
          icon={<FeatherPlusCircle />}
          onClick={() => {
            onAdd();
          }}
        >
          Add Todo
        </Button>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex w-full items-center gap-2 border border-solid border-neutral-border px-2 py-2">
            <Checkbox
              label={todo.task}
              checked={todo.is_complete}
              onCheckedChange={(checked: boolean) => {
                onComplete(todo.id, checked);
              }}
            />
            <span className="text-monospace-body font-monospace-body text-default-font">
              {todo.id}
            </span>
            <IconButton
              className="ml-auto hover:shadow-md hover:shadow-md:hover transition-shadow"
              variant="destructive-secondary"
              size="small"
              icon={<FeatherX />}
              onClick={() => {
                onDelete(todo.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
