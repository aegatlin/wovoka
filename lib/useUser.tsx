import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, SupabaseUser } from './supabaseClient'
import { User } from './types'

const UserContext = createContext<{
  user: User | undefined
  signIn: () => void
  signOut: () => void
  isLoading: boolean | undefined
  isError: boolean | undefined
}>({
  user: undefined,
  signIn: () => undefined,
  signOut: () => undefined,
  isLoading: undefined,
  isError: undefined,
})

export function ProvideUser({ children }) {
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>()
  const [user, setUser] = useState<User>()
  const [isError, setIsError] = useState<boolean>()
  const [isLoading, setIsLoading] = useState<boolean>()

  supabase.auth.onAuthStateChange((event, session) => {
    setSupabaseUser(supabase.auth.user() || null)
  })

  useEffect(() => {
    setSupabaseUser(supabase.auth.user() || null)
  }, [])

  useEffect(() => {
    if (!supabaseUser) {
      setUser(undefined)
    } else {
      setUser({ id: supabaseUser.id, email: supabaseUser.email || '' })
    }
  }, [supabaseUser])

  useEffect(() => {
    if (!user && !isError) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [isError, user])

  const signIn = () => {
    const doSignIn = async () => {
      const { user: u, error } = await supabase.auth.signIn({
        email: 'austin.e.gatlin@gmail.com',
      })

      console.log(u, error)
      if (u) setUser({ id: u.id, email: u.email || '' })
      if (error) setIsError(true)
    }

    doSignIn()
  }

  const signOut = () => {
    const doSignOut = async () => {
      const { error } = await supabase.auth.signOut()

      if (!error) {
        setSupabaseUser(undefined)
      } else {
        console.log('Problem signing out: ', error)
      }
    }

    doSignOut()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoading,
        isError,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const { user, signIn, signOut, isError, isLoading } = useContext(UserContext)
  return {
    user,
    signIn,
    signOut,
    isError,
    isLoading,
  }
}
