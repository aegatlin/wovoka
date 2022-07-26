import { Group } from '@prisma/client'
import { db } from '../../db'
import { item } from '../../front/api/item'

export const Groups = {
  async all(user): Promise<Group[]> {
    const x = await db.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        groups: {
          include: { members: true, lists: { include: { items: true } } },
        },
      },
    })
    return x?.groups ?? []
  },
}
