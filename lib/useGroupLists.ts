import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { List } from './types'

export function useGroupLists({ groupId }) {
  const [lists, setLists] = useState<List[] | null>(null)

  useEffect(() => {
    if (!groupId) return

    const getLists = async () => {
      const { data: ls, error } = await supabase
        .from('lists')
        .select('id, group_id, title')
        .eq('group_id', groupId)

      if (ls) {
        setLists(
          ls.map(l => ({
            id: l.id,
            groupId: l.group_id,
            title: l.title,
            items: [],
          }))
        )
      } else {
        console.log('Problem fetching lists: ', error)
      }
    }
    getLists()
  }, [groupId])

  return { lists }
}
