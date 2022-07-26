import { createContext, useContext } from 'react'
import useSWR from 'swr'
import { User } from '../types'

export function useUserContext() {
  const { user, error } = useContext(UserContext)
  return { user, error }
}

const UserContext = createContext<{ user: User | null; error: string | null }>({
  user: null,
  error: null,
})

export function ProvideUser({ children }) {
  const { data, error } = useSWR('/api/auth/session')

  return (
    <UserContext.Provider
      value={{
        user: data?.user,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
