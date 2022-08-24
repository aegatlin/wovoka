import { PrismaClient } from '@prisma/client'

async function seed() {
  const prisma = new PrismaClient()

  const u = await prisma.user.create({
    data: {
      email: 'a@b.c',
    },
  })

  const g = await prisma.group.create({
    data: {
      name: 'My First Group',
      members: {
        connect: { id: u.id },
      },
    },
  })

  const l = await prisma.list.create({
    data: {
      name: 'My First list',
      groupId: g.id,
    },
  })

  const i = await prisma.item.create({
    data: {
      title: 'My First Item',
      listId: l.id,
    },
  })

  console.log('created: ', u, g, l, i)
}

seed()
