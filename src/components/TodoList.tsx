'use client'

import { Database } from '@/utils/database.types'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

type Todos = Database['public']['Tables']['todos']['Row']

export default function TodoList({ userId }: { userId: string }) {
  const supabase = createClient()
  const [todos, setTodos] = useState<Todos[]>([])
  const [newTaskText, setNewTaskText] = useState('')
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('id', { ascending: true })

      if (error) console.log('error', error)
      else setTodos(todos)
    }

    fetchTodos()
  }, [supabase, userId])

  const addTodo = async (taskText: string) => {
    let task = taskText.trim()
    if (task.length <= 3) {
      setErrorText('Task must be more than 3 characters')
      return
    }

    const { data: todo, error } = await supabase
      .from('todos')
      .insert({ task, user_id: userId })
      .select()
      .single()

    if (error) {
      setErrorText(error.message)
    } else {
      setTodos([...todos, todo])
      setNewTaskText('')
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)
        .select()

      if (error) throw error

      if (!data || data.length === 0) {
        setErrorText('Todo not found or access denied')
        return
      }

      setTodos(todos.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
      setErrorText('Failed to delete todo')
    }
  }

  return (
    <div className="w-full">
      <h1 className="mb-12 text-4xl font-bold text-gray-900 dark:text-white">Todo List.</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo(newTaskText)
        }}
        className="flex gap-2 my-2"
      >
        <input
          className="rounded w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          type="text"
          placeholder="make coffee"
          value={newTaskText}
          onChange={(e) => {
            setErrorText('')
            setNewTaskText(e.target.value)
          }}
        />
        <button className="btn-black px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 rounded transition-colors" type="submit">
          Add
        </button>
      </form>
      {!!errorText && <Alert text={errorText} />}
      <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} userId={userId} onDelete={() => deleteTodo(todo.id)} />
        ))}
      </ul>
    </div>
  )
}

const Todo = ({ todo, userId, onDelete }: { todo: Todos; userId: string; onDelete: () => void }) => {
  const supabase = createClient()
  const [isCompleted, setIsCompleted] = useState(todo.is_complete)
  const [errorText, setErrorText] = useState('')

  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ is_complete: !isCompleted })
        .eq('id', todo.id)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error

      if (!data) {
        setErrorText('Failed to update todo or access denied')
        return
      }

      setIsCompleted(data.is_complete)
    } catch (error) {
      console.log('error', error)
      setErrorText('Failed to update todo')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return 'yesterday'
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <>
      {!!errorText && <Alert text={errorText} />}
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="flex items-center">
            <input
              className="cursor-pointer size-4 rounded border-gray-300 dark:border-gray-600"
              onChange={() => toggle()}
              type="checkbox"
              checked={isCompleted ? true : false}
            />
          </div>
          <div className="min-w-0 flex-auto">
            <p className={`text-sm/6 font-semibold ${isCompleted ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
              {todo.task}
            </p>
            <p className="mt-1 truncate text-xs/5 text-gray-500 dark:text-gray-400">
              Created {formatDate(todo.inserted_at)}
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          {isCompleted ? (
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1 dark:bg-emerald-500/30">
                <div className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs/5 text-gray-500 dark:text-gray-400">Completed</p>
            </div>
          ) : (
            <p className="text-xs/5 text-gray-500 dark:text-gray-400">In progress</p>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDelete()
            }}
            className="mt-1 text-xs/5 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </li>
    </>
  )
}

const Alert = ({ text }: { text: string }) => (
  <div className="rounded-md bg-red-100 dark:bg-red-900/30 p-4 my-3">
    <div className="text-sm leading-5 text-red-700 dark:text-red-400">{text}</div>
  </div>
)
