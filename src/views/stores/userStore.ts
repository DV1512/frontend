import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GetUserByFilter, User } from 'sdk'
import authService from '../services/authService'
import { getUser } from 'sdk'

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
      this.loading = true

      authService.login(username, password)
      const token = authService.getAccessToken()!

      await this.getUserInfo(token)

      this.loading = false
    },

    async getUserInfo(token: string) {
      const filter = new GetUserByFilter()
      filter.token = authService.getAccessToken()!
      this.user = await getUser(token, filter)
    }
  }
})
