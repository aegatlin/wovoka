export type Use<T> = T & {
  isLoading: boolean
  isError: boolean
}

export type Pre<T> = Omit<T, 'id'>

export interface Item {
  id: string
  title: string
  listId: string
}

export interface List {
  id: string
  title: string
  items: Item[]
}

export interface Group {
  id: string
  title: string
  userId: string
  lists: List[]
}

export interface User {
  id: string
  email: string
}

export interface Repo<T> {
  all?: (...rest: any) => Promise<T[] | null>
  get?: (id: string) => Promise<T | null>
  delete?: (t: T) => Promise<boolean>
  create?: (pre: Pre<T>) => Promise<T | null>
  update?: (t: T) => Promise<T | null>
}

export interface AuthData {
  email: string
  rememberMe: boolean
}

export interface JsonApi<T> {
  data: T
}
