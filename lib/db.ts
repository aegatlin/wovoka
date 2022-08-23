import { PrismaClient } from '@prisma/client'

export const db = {
  prisma: new PrismaClient(),
}
