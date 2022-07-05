export type Use<T> = T & {
  isLoading: boolean
  isError: boolean
}

export type Pre<T> = Omit<T, 'id'>

export interface Item {
  id: string
  listId: string
  title: string
}

export interface List {
  id: string
  groupId: string
  title: string
}

export type ListWithItems = List & { items: Item[] }

export interface Group {
  id: string
  title: string
}

export interface User {
  id: string
  email: string
}
