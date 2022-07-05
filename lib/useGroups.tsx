import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { Group } from './types'
import { useUser } from './useUser'

const GroupsContext = createContext<{ groups: Group[] | null }>({
  groups: null,
})

export function ProvideGroups({ children }) {
  const { user } = useUser()
  const [groups, setGroups] = useState<Group[] | null>(null)

  useEffect(() => {
    if (!user) return

    const getGroups = async () => {
      const { data: gs, error } = await supabase
        .from('groups')
        .select('id, title, user_id')
        .eq('user_id', user.id)

      if (gs) {
        setGroups(gs.map(g => ({ id: g.id, title: g.title })))
      } else {
        console.log('Problem fetching groups: ', error)
      }
    }

    getGroups()
  }, [user])

  return (
    <GroupsContext.Provider
      value={{
        groups,
      }}
    >
      {children}
    </GroupsContext.Provider>
  )
}

export function useGroups() {
  const { groups } = useContext(GroupsContext)

  return {
    groups,
  }
}
