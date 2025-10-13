"use client";

import { ReactNode } from "react";
import { Checkbox } from "@/ui/components/Checkbox";
import { completeTodo } from "@/app/(protected)/tasks/actions";
import { Todo } from "@/types";

// TodoList component - accepts children slot for todo items
export function TodoList({ children }: { children: ReactNode }) {
    return (
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-4 bg-default-background py-12">
            <h1 className="text-2xl font-bold text-default-font">Todos</h1>
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    );
}

// TodoItem component - accepts checkbox and children slots
export function TodoItem({ 
    checkbox, 
    children 
}: { 
    checkbox: ReactNode; 
    children: ReactNode;
}) {
    return (
        <div className="flex items-center gap-2 text-left text-sm text-gray-500 font-mono ml-4 my-4 space-y-2">
            {checkbox}
            {children}
        </div>
    );
}

// TodoCheckbox component - handles the interactive checkbox logic
export function TodoCheckbox({ 
    todo 
}: { 
    todo: Todo;
}) {
    return (
        <Checkbox 
            checked={todo.is_complete} 
            onCheckedChange={(checked: boolean) => {
                completeTodo(todo.id, checked).then((updatedTodo) => {
                    console.log(updatedTodo);
                });
            }}
        />
    );
}

// TodoText component - renders the todo text as a slot
export function TodoText({ children }: { children: ReactNode }) {
    return <span>{children}</span>;
}

