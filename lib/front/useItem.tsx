import { useEffect, useState } from 'react'
import { api } from './api'
import { Item, Pre } from './types'
import { useGroupsContext } from './useGroupsContext'

interface UseItem {
  item?: Item
  destroy: (item: Item) => void
  create: (preItem: Pre<Item>) => void
}

export function useItem({ itemId }): UseItem {
  const { groups, sync } = useGroupsContext()
  const [item, setItem] = useState<Item>()
  useEffect(() => {
    groups?.forEach((g) => {
      g.lists.forEach((l) => {
        l.items.forEach((i) => {
          if (i.id == itemId) {
            setItem(i)
            return
          }
        })
      })
    })
  })

  async function destroy() {
    console.log('?')
    if (!item) return
    console.log('??')
    const isSuccess = await api.item.delete(item)
    console.log('???', isSuccess)
    if (isSuccess) sync()
  }

  async function create(preItem: Pre<Item>) {
    const r = await api.item.create(preItem)
    if (r) sync()
  }

  return { item, destroy, create }
}
