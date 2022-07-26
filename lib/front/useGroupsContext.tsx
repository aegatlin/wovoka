import { createContext, useContext } from 'react'
import useSWR from 'swr'
import { Group } from '../types'

interface GroupsContext {
  groups?: Group[]
  error?: string
}

const GroupsContext = createContext<GroupsContext>({})

export function useGroupsContext(): GroupsContext {
  const { groups } = useContext(GroupsContext)
  return { groups }
}

export function ProvideGroups({ children }) {
  const { data, error } = useSWR('/api/groups')

  return (
    <GroupsContext.Provider
      value={{
        groups: data?.groups,
        error,
      }}
    >
      {children}
    </GroupsContext.Provider>
  )
}
