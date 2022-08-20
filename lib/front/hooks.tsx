import { Group, Item, List } from '@prisma/client'
import useSWR from 'swr'
import { routes } from '../routes'
import { JsonApi } from '../types'

export function useGroups() {
  const { data, error } = useSWR<JsonApi<{ groups: Group[] }>>(
    routes.api.groups.index()
  )
  return { groups: data?.data.groups ?? null, error }
}

export function useGroup(groupId: string) {
  const { data, error } = useSWR<JsonApi<{ group: Group }>>(
    routes.api.groups.groupId(groupId)
  )
  return { group: data?.data.group ?? null, error }
}

export function useGroupLists(groupId: string) {
  const { data, error } = useSWR<JsonApi<{ lists: List[] }>>(
    routes.api.groups.groupIdLists(groupId)
  )
  return { lists: data?.data.lists ?? null, error }
}

export function useGroupList(groupId: string, listId: string) {
  const { data, error } = useSWR<JsonApi<{ list: List }>>(
    routes.api.groups.groupIdListsListId(groupId, listId)
  )
  return { list: data?.data.list ?? null, error }
}

export function useGroupListItems(groupId: string, listId: string) {
  const { data, error } = useSWR<JsonApi<{ items: Item[] }>>(
    routes.api.groups.groupIdListsListIdItems(groupId, listId)
  )
  return { items: data?.data.items ?? null, error }
}
