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
      this.loading = true

      authService.login(username, password)
      const token = authService.getAccessToken()!
      const filter = new GetUserByFilter()
      filter.token = authService.getAccessToken()!
      const userInfo = await getUser(token, filter)
      this.user = userInfo

      this.loading = false
    }
  }
})
