import crypto from 'node:crypto'
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

export async function eventually<T>(f: () => Promise<T | null>): Promise<T> {
  let data: T | null = null
  while (!data) {
    data = await f()
    sleep(1000)
  }
  return data
}

export function computeHash(hex: string): string {
  return crypto.createHash('sha256').update(hex, 'hex').digest('hex')
}
