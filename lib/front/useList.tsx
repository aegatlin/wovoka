import { useEffect, useState } from 'react'
import { Item, List, Pre } from './types'
import { useGroupsContext } from './useGroupsContext'

export function useList({ listId }): { list?: List } {
  const { groups } = useGroupsContext()
  const [list, setList] = useState<List>()

  async function newItem(preItem: Pre<Item>) {
    api.list.newItem()
  }

  useEffect(() => {
    if (!groups) return

    groups.forEach((g) => {
      g.lists.forEach((l) => {
        if (l.id == listId) {
          setList(l)
          return
        }
      })
    })
  }, [groups, listId])

  return { list }
}
