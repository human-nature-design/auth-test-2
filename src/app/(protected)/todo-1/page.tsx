import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import TodoList from '@/components/TodoList'
import LogoutButton from '@/components/logout-button'

export default async function TodosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center p-4"
      style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
    >
      <TodoList userId={user.id} />
      <LogoutButton />
    </div>
  )
}
