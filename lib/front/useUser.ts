import useSWR from 'swr'
import { url } from './api'

export function useUser() {
  const { data, mutate, error } = useSWR(url.session())

  return {
    user: data?.data?.user ?? null,
    error,
    mutate,
  }
}
