import { Item, List, User } from '@prisma/client'
import { db } from '../../db'
import { NewItem } from '../../types'

export const Items = {
  async all(list: List): Promise<Item[]> {
    return await db.prisma.item.findMany({ where: { listId: list.id } })
  },
  async one(id: string): Promise<Item | null> {
    return await db.prisma.item.findUnique({ where: { id } })
  },
  async oneWithMember(itemId: string, user: User): Promise<Item | null> {
    return await db.prisma.item.findFirst({
      where: {
        id: itemId,
        list: { group: { members: { some: { id: user.id } } } },
      },
    })
  },
  async create({ title: title, listId }: NewItem): Promise<Item> {
    return await db.prisma.item.create({ data: { title, listId } })
  },
  async destroy(id: string): Promise<boolean> {
    await db.prisma.item.delete({ where: { id } })
    return true
  },
}
