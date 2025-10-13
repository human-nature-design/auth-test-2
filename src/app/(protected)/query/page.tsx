import { getTodos } from "@/app/(protected)/tasks/actions";
import { TodoList, TodoItem, TodoCheckbox, TodoText } from "./todo-comp";
import { createClient } from "@/utils/supabase/server";
import { Todo } from "@/types";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";



export default async function QueryPage() {
    const todos = await getTodos();
    console.log(todos);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();


    return (
        <DefaultPageLayout 
           userNameSlot={user?.email}>

        <TodoList>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    checkbox={<TodoCheckbox todo={todo} />}
                >
                    <TodoText>{todo.task}</TodoText>
                </TodoItem>
            ))}
        </TodoList>
        </DefaultPageLayout>
    );
}