'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/todos')
      router.refresh()
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email to confirm your account!')
    }
    setLoading(false)
  }

  return (
    <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 flex flex-col text-base transition-colors">
      <span className="font-sans text-4xl text-center pb-2 mb-1 border-b border-gray-200 dark:border-gray-700 mx-4 align-center text-gray-900 dark:text-white">
        {isSignUp ? 'Sign Up' : 'Login'}
      </span>

      <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="pt-3 pb-3 space-y-3">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="you@example.com"
            required
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-100 dark:bg-red-900/30 p-3">
            <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
          </div>
        )}

        {message && (
          <div className="rounded-md bg-green-100 dark:bg-green-900/30 p-3">
            <div className="text-sm text-green-700 dark:text-green-400">{message}</div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError(null)
              setMessage(null)
            }}
            className="underline hover:text-gray-900 dark:hover:text-white"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </form>
    </div>
  )
}
