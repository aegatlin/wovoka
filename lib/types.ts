export type Pre<T> = Omit<T, 'id'>

export interface User {
  id: string
  email: string
}

export interface AuthData {
  email: string
  rememberMe: boolean
}

export interface JsonApi<T> {
  data: T
}
