import { PrismaClient } from '@prisma/client'

export class db {
  private static _prisma: PrismaClient
  private constructor() {}

  public static get prisma(): PrismaClient {
    if (!db._prisma) {
      db._prisma = new PrismaClient()
    }
    return db._prisma
  }
}
