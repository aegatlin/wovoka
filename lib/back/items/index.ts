import { Item, List } from '@prisma/client'
import { db } from '../../db'

export const Items = {
  async all(list: List): Promise<Item[]> {
    return await db.prisma.item.findMany({ where: { listId: list.id } })
  },
  async one(id: string): Promise<Item | null> {
    return await db.prisma.item.findUnique({ where: { id } })
  },
  async create({
    content,
    listId,
  }: {
    content: string
    listId: string
  }): Promise<Item> {
    return await db.prisma.item.create({ data: { content, listId } })
  },
}
