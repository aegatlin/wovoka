import { Prisma, PrismaClient } from '@prisma/client'

type PrismaDB = PrismaClient | Prisma.TransactionClient

export class db {
  private static _prisma: PrismaDB
  private constructor() {}

  public static get prisma(): PrismaDB {
    if (!db._prisma) {
      if (process.env.NODE_ENV == 'test') {
        new PrismaClient().$transaction(async (prisma) => {
          db._prisma = prisma
        })
      } else {
        db._prisma = new PrismaClient()
      }
    }
    return db._prisma
  }

  public static set(p) {
    db._prisma = p
  }

  async setTestPrisma() {
    await new PrismaClient().$transaction(async (prisma) => {
      db._prisma = prisma
    })
  }
}
