import { getTodos } from "@/app/(protected)/tasks/actions";

export default async function QueryPage() {
    const todos = await getTodos();
    return (
        <div>
            <h1>Todos</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </ul>
        </div>
    )
}