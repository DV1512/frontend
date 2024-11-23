import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { GetUserByFilter, User } from 'sdk'
import authService from '../services/authService'
import { getUser } from 'sdk'

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      user: reactive<User | {}>({}),
      loading: false
    }
  },

  getters: {
    isLoggedIn(): boolean {
      return this.user !== null
    }
  },

  actions: {
    async login(username: string, password: string) {
      if (!username || !password) {
        console.error('Username or password is missing')
        return false
      }

      this.loading = true

      try {
        await authService.login(username, password)
        const token = authService.getAccessToken()
        if (!token) {
          console.error('Failed to get access token')
          return false
        }
        await this.getUserInfo(token)
        console.log('User info fetched successfully')
        return true
      } catch (error) {
        console.error('Login failed', error)
      } finally {
        this.loading = false
      }
    },

    async signup(
      username: string,
      email: string,
      first_name: string,
      last_name: string,
      password: string
    ) {
      if (!first_name || !last_name || !username || !email || !password) {
        console.error('First name, last name, username, email, or password is missing')
        return
      }

      this.loading = true

      try {
        await authService.signup(username, email, first_name, last_name, password)
      } catch (error) {
        console.error('Signup failed', error)
      } finally {
        this.loading = false
      }
    },

    async getUserInfo(token: string) {
      const filter = new GetUserByFilter()
      filter.token = token
      const userInfo = await getUser(token, filter)
      this.user = userInfo
      console.log('User info fetched successfully:', userInfo)
    },

    async logout(): Promise<void> {
      try {
        await authService.logout()
        this.user = null
        this.loading = false
      } catch (error) {
        console.error('Logout failed', error)
      }
    },
    async updateUser(updatedUser: User) {
      this.user = updatedUser
    }
  }
})
