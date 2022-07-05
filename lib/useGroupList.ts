import { useEffect, useState } from 'react'
import { api } from './api'
import { Item, List, ListWithItems, Pre } from './types'
import { useGroupLists } from './useGroupLists'

export function useGroupList({ groupId, listId }): {
  list: ListWithItems | null
  create: (preItem: Pre<Item>) => void
  destroy: (item: Item) => void
} {
  const { lists } = useGroupLists({ groupId })
  const [list, setList] = useState<List | null>(null)
  const [items, setItems] = useState<Item[] | null>(null)

  useEffect(() => {
    if (!lists) return
    setList(lists.find(l => l.id == listId) || null)
  }, [groupId, listId, lists])

  useEffect(() => {
    async function allItems() {
      if (!list) return
      const items = await api.items.all(list.id)
      setItems(items)
    }

    allItems()
  }, [list])

  const create = (preItem: Pre<Item>) => {
    async function createItem() {
      if (!list) return
      const item = await api.items.create(preItem)
      if (item) {
        setItems(await api.items.all(list.id))
      }
    }

    createItem()
  }

  const destroy = (item: Item) => {
    async function deleteItem() {
      if (!list) return
      const isSuccess = await api.items.delete(item)
      if (isSuccess) {
        setItems(await api.items.all(list.id))
      }
    }

    deleteItem()
  }

  return {
    list: list && items ? { ...list, items: items } : null,
    create,
    destroy,
  }
}
