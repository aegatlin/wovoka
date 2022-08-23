import { Group, List, User } from '@prisma/client'
import { db } from '../../db'

export const Lists = {
  async all(group: Group): Promise<List[]> {
    return await db.prisma.list.findMany({ where: { groupId: group.id } })
  },
  async one(id: string): Promise<List | null> {
    return await db.prisma.list.findUnique({ where: { id } })
  },
  async oneWithMember(id: string, user: User): Promise<List | null> {
    return await db.prisma.list.findFirst({
      where: { id, group: { members: { some: { id: user.id } } } },
    })
  },
}
