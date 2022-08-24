export type Pre<T> = Omit<T, 'id'>

export interface AuthData {
  email: string
  rememberMe: boolean
}

export interface JsonApi<T> {
  data: T
}

export interface NewItem {
  title: string
  listId: string
}
