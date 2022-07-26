import { db } from '../lib/db'

export async function resetdb() {
  await db.prisma.$executeRaw`
  TRUNCATE "User", "Token", "Group", "List", "_GroupToUser" RESTART IDENTITY CASCADE;
  `
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolutionFunction) => {
    setTimeout(resolutionFunction, ms)
  })
}