import { api } from './api'

export function useAuth() {
  return {
    signUp: async (email: string) => await api.auth.signUp(email),
  }
}
