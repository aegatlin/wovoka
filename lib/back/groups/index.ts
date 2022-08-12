import { Group, User } from '@prisma/client'
import { db } from '../../db'

export const Groups = {
  async all(user: User): Promise<Group[]> {
    return await db.prisma.group.findMany({
      where: { members: { some: { id: user.id } } },
    })
  },
  async create(user: User, name: string): Promise<Group> {
    return await db.prisma.group.create({
      data: { name, members: { connect: [{ id: user.id }] } },
    })
  },
  async destroy(id: string): Promise<void> {
    await db.prisma.group.delete({ where: { id } })
    return
  },
}
