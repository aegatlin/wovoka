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

export function useGroup(groupId: string | null) {
  const { data, error } = useSWR<JsonApi<{ group: Group }>>(
    groupId ? routes.api.groups.groupId(groupId) : null
  )
  return { group: data?.data.group ?? null, error }
}

export function useGroupLists(groupId: string | null) {
  const { data, error } = useSWR<JsonApi<{ lists: List[] }>>(
    groupId ? routes.api.groups.groupIdLists(groupId) : null
  )
  return { lists: data?.data.lists ?? null, error }
}

export function useGroupList(groupId: string | null, listId: string | null) {
  const { data, error } = useSWR<JsonApi<{ list: List }>>(
    groupId && listId
      ? routes.api.groups.groupIdListsListId(groupId, listId)
      : null
  )
  return { list: data?.data.list ?? null, error }
}

export function useGroupListItems(
  groupId: string | null,
  listId: string | null
) {
  const { data, error, mutate } = useSWR<JsonApi<{ items: Item[] }>>(
    groupId && listId
      ? routes.api.groups.groupIdListsListIdItems(groupId, listId)
      : null
  )
  return { items: data?.data.items ?? null, error, mutate }
}
