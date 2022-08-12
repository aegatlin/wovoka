import { Group } from '@prisma/client'
import useSWR from 'swr'
import { JsonApi } from '../types'
import { url } from './api'

export function useGroups() {
  const { data, error } = useSWR<JsonApi<{ groups: Group[] }>>(url.groups.all())
  return { groups: data?.data.groups ?? null, error }
}
