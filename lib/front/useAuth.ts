import { AuthData } from '../types'
import { api } from './api'

export function useAuth() {
  return {
    signUp: async (authData: AuthData) => await api.auth.signUp(authData),
    signIn: async (authData: AuthData) => await api.auth.signIn(authData),
  }
}
