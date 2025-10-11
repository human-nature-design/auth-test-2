import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/login-form'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/(protected)/todo-3')
  }

  return (
    <div className="min-w-full min-h-screen flex items-center justify-center">
      <div className="w-full h-full flex justify-center items-center p-4">
        <LoginForm />
      </div>
    </div>
  )
}
