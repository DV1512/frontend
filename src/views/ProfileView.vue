<script lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import TheContainer from '@/components/TheContainer.vue'
import { userStore } from './stores/userStore'
import authService from './services/authService'
import { getUser } from 'sdk/pkg/sdk'

const store = userStore

export default {
  components: {
    TheContainer
  },
  data() {
    return {
      userInfo: {
        firstName: store().user?.first_name || '',
        lastName: store().user?.last_name || '',
        username: store().user?.username || '',
        email: store().user?.email || '',
        password: ''
      },
      password: '', // Add the password property
      confirmPassword: '', // Add the confirmPassword property if needed
      isLoading: false,
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    }
  },
  methods: {
    async handleProfileUpdateClick() {
      if (!this.isFormValid) {
        alert('Please ensure all fields are valid.')
        return
      }

      this.isLoading = true

      const updatedProfile = {
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        username: this.userInfo.username,
        email: this.userInfo.email,
        password: this.userInfo.password || null
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authService.getAccessToken()}`
          },
          body: JSON.stringify(updatedProfile)
        })

        if (!response.ok) {
          const error = await response.json()
          console.error('Failed to update profile:', error)
          alert(`Failed to update profile: ${error.message || 'Unknown error'}`)
          return
        }

        const updatedUser = await response.json()
        userStore().user = updatedUser // Update the user store
        alert('Profile updated successfully!')
      } catch (error) {
        console.error('Error updating profile:', error)
        alert('Error updating profile. Please try again later.')
      } finally {
        this.isLoading = false
      }
    },

    async handleAccountDeleteClick() {
      if (!confirm('Are you sure you want to delete your account? This action is irreversible.')) {
        return
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/delete`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authService.getAccessToken()}`
          }
        })

        if (!response.ok) {
          const error = await response.json()
          console.error('Failed to delete account:', error)
          alert(`Failed to delete account: ${error.message || 'Unknown error'}`)
          return
        }

        alert('Account deleted successfully!')
        userStore().logout()
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error('Error deleting account:', error)
        alert('Error deleting account. Please try again later.')
      }
    },

    handleDeclineChangesClick() {
      if (confirm('Are you sure you want to cancel the changes? Unsaved changes will be lost.')) {
        Object.assign(store.user, this.originalProfile)
      }
    }
  }
}
</script>

<template>
  <div class="app-container">
    <TheContainer>
      <template #heading>{{ userInfo.username }}</template>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input
              type="text"
              v-model="userInfo.firstName"
              class="input"
              placeholder="First Name"
              required
            />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input
              type="text"
              v-model="userInfo.lastName"
              class="input"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              type="email"
              v-model="userInfo.email"
              class="input"
              placeholder="Email"
              required
            />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input
              type="text"
              v-model="userInfo.username"
              class="input"
              placeholder="Username"
              required
            />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              type="password"
              v-model="password"
              class="input"
              placeholder="Password"
              minlength="8"
            />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control">
            <input
              type="password"
              v-model="confirmPassword"
              class="input"
              placeholder="Confirm Password"
              minlength="8"
            />
            <p v-if="password !== confirmPassword" class="help is-danger">
              Passwords do not match.
            </p>
          </div>
        </div>
      </div>

      <div class="columns is-centered mt-5">
        <div class="column is-narrow">
          <button
            type="submit"
            class="button is-primary custom-button"
            :disabled="!isFormValid || isLoading"
          >
            <span v-if="isLoading">Updating...</span>
            <span v-else>Update Profile</span>
          </button>
        </div>
      </div>
      <div class="columns is-centered mt-5">
        <div class="column is-narrow">
          <button @click="handleDeclineChangesClick" class="button is-primary custom-button">
            Decline Changes
          </button>
        </div>
        <div class="column is-narrow">
          <button @click="handleAccountDeleteClick" class="button is-primary custom-button">
            Delete Account
          </button>
        </div>
      </div>
    </TheContainer>
  </div>
</template>

<style scoped>
.custom-button {
  width: 250px;
  margin: 0 80px;
}

.field {
  width: 70%;
  margin-top: 1.5rem;
}

.mt-5 {
  margin-top: 2rem;
}
</style>
