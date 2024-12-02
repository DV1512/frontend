import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GetUserByFilter, User } from 'sdk'
import authService from '../services/authService'
import userService from '../services/userService'
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

    async updateUserDetails(updatedInfo: {
      username: string
      email: string
      first_name: string
      last_name: string
      password: string
    }) {
      const updatedUser = await userService.updateUser(
        updatedInfo.username,
        updatedInfo.email,
        updatedInfo.first_name,
        updatedInfo.last_name,
        updatedInfo.password
      )

      if (updatedUser) {
        this.user = updatedUser
        console.log('User store updated:', this.user)
      } else {
        console.error('Failed to update user details.')
      }
    },

    async updateUser() {
      if (!this.user) {
        console.error('No user available for update')
        return
      }

      this.loading = true

      try {
        const { username, email, first_name, last_name } = this.user
        const password = ''
        const updatedUser = await userService.updateUser(
          username,
          email,
          first_name,
          last_name,
          password
        )

        if (updatedUser) {
          this.user = { ...this.user, ...updatedUser }
          console.log('User update successful')
        }
      } catch (error) {
        console.error('User update failed', error)
      } finally {
        this.loading = false
      }
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

    async delete() {
      if (!this.user) {
        console.error('No user available for deletion')
        return
      }

      this.loading = true

      try {
        await userService.deleteUser()
        this.user = null
        console.log('User deleted successfully')
      } catch (error) {
        console.error('User deletion failed', error)
      } finally {
        this.loading = false
      }
    }
  }
})
