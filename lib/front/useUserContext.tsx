import { createContext, useContext } from 'react'
import useSWR from 'swr'

export function useUserContext() {
  const { user, error } = useContext(UserContext)
  return { user, error }
}

const UserContext = createContext({
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
