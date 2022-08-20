import useSWR from 'swr'
import { routes } from '../routes'

export function useUser() {
  const { data, mutate, error } = useSWR(routes.api.auth.session())

  return {
    user: data?.data?.user ?? null,
    error,
    mutate,
  }
}
