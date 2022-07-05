import { supabase } from './supabaseClient'
import { Item, Pre } from './types'

export const api = {
  items: {
    all: async (listId: string): Promise<Item[] | null> => {
      const { data, error } = await supabase
        .from('items')
        .select('id, title, list_id')
        .eq('list_id', listId)

      if (!error) {
        return data.map(i => transform.item.fromSupabaseItem(i))
      } else {
        console.log('Problem fetching all items', error)
        return null
      }
    },
    create: async (preItem: Pre<Item>): Promise<Item | null> => {
      const { data: item, error } = await supabase
        .from('items')
        .insert([{ title: preItem.title, list_id: preItem.listId }])

      if (!error) {
        return transform.item.fromSupabaseItem(item)
      } else {
        console.log('Problem creating item', error)
        return null
      }
    },
    delete: async (item: Item): Promise<boolean> => {
      const { error } = await supabase
        .from('items')
        .delete()
        .match({ id: item.id })

      if (!error) {
        return true
      } else {
        console.log('Problem deleting item: ', error)
        return false
      }
    },
  },
}

const transform = {
  item: {
    fromSupabaseItem: (item): Item => {
      return {
        id: item.id,
        listId: item.list_id,
        title: item.title,
      }
    },
  },
}
