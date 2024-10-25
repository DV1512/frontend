import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { User } from 'sdk'

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      user: null,
      loading: false
    }
  },

  getters: {
    isLoggedIn(): boolean {
      return this.user !== null
    },

    user(): User | null {
      return this.user
    }
  },

  actions: {}
})
