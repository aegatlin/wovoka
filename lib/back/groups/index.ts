import { Group, User } from '@prisma/client'
import { db } from '../../db'

export const Groups = {
  async all(user: User): Promise<Group[]> {
    return await db.prisma.group.findMany({
      where: { members: { some: { id: user.id } } },
    })
  },
  async one(id: string): Promise<Group | null> {
    return await db.prisma.group.findFirst({ where: { id } })
  },
  async oneWithMember(id: string, user: User): Promise<Group | null> {
    return await db.prisma.group.findFirst({
      where: { id, members: { some: { id: user.id } } },
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
