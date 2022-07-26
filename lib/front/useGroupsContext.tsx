import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Group } from '../types'
import { api } from './api'

interface GroupsContext {
  groups?: Group[]
  sync: () => void
}

const GroupsContext = createContext<GroupsContext>({
  sync: () => undefined,
})

export function useGroupsContext(): GroupsContext {
  const { groups, sync } = useContext(GroupsContext)

  return {
    groups,
    sync,
  }
}

export function ProvideGroups({ children }) {
  const [groups, setGroups] = useState<Group[]>([])

  return (
    <GroupsContext.Provider
      value={{
        groups,
        sync: () => undefined,
      }}
    >
      {children}
    </GroupsContext.Provider>
  )
}
