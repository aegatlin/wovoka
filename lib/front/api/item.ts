import { Item, Pre, Repo } from '../../types'

export const item = {
  async create(preItem: Pre<Item>): Promise<Item | null> {
    return itemRepo.create(preItem)
  },

  async update() {
    return null
  },

  async delete(item: Item) {
    return itemRepo.delete(item)
  },
}

type ItemRepo = Required<Pick<Repo<Item>, 'create' | 'update' | 'delete'>>
const itemRepo: ItemRepo = {
  async create(preItem: Pre<Item>) {
    return null
  },

  async update(item) {
    return null
  },

  async delete(item: Item) {
    return false
  },
}
