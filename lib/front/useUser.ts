import { User } from '@prisma/client'
import useSWR from 'swr'
import { routes } from '../routes'

export function useUser(): {
  user: User | null | undefined
  mutate: () => void
} {
  const { data, mutate, error } = useSWR(routes.api.auth.session())

  let user: User | null | undefined
  if (data) {
    user = data?.data?.user ?? null
  } else {
    user = undefined
  }

  return { user: data ? data?.data?.user ?? null : undefined, mutate }
}
