import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GetUserByFilter, User } from 'sdk'
import authService from '../services/authService'
import { getUser } from 'sdk'
import { useRouter } from 'vue-router'

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      user: ref<User | null>(null),
      loading: ref(false)
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
        return
      }

      this.loading = true

      try {
        await authService.login(username, password)
        const token = authService.getAccessToken()
        if (!token) {
          throw new Error('Failed to get access token')
        }

        const filter = new GetUserByFilter()
        filter.token = token
        const userInfo = await getUser(token, filter)
        this.user = userInfo
        console.log('User info fetched successfully:', userInfo)
      } catch (error) {
        console.error('Login failed', error)
      } finally {
        this.loading = false
      }
    }
  }
})
