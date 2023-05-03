import { AuthUser } from '../types/auth.types'
import { User } from '../types/user.types'
export const storage = {
  setUser: (user: AuthUser) => {
    window.localStorage.setItem('user', JSON.stringify(user))
  },
  getUser: () => {
    const userRaw = window.localStorage.getItem('user')
    if (userRaw) {
      return JSON.parse(userRaw)
    }
  },
  clearToken: () => {
    window.localStorage.removeItem('token')
  },

  setUserLoggedUser: (user: User) => {
    window.localStorage.setItem('LoggedUser', JSON.stringify(user))
  },
  getLoggedUser: () => {
    const userRaw = window.localStorage.getItem('LoggedUser')
    if (userRaw) {
      return JSON.parse(userRaw)
    }
  }
}
