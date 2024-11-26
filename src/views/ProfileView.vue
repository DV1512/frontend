<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import TheContainer from '@/components/TheContainer.vue'
import { userStore } from './stores/userStore'
import authService from './services/authService'

const store = userStore()
const router = useRouter()

const confirmPassword = ref('')
const password = ref('')
const isLoading = ref(false)
const originalProfile = reactive({ ...store.user })

const isFormValid = computed(() => {
  return (
    originalProfile.first_name &&
    originalProfile.username &&
    originalProfile.email &&
    (!password.value || password.value === confirmPassword.value)
  )
})

const handleProfileUpdateClick = async () => {
  if (!isFormValid.value) {
    alert('Please ensure all fields are valid.')
    return
  }

  isLoading.value = true

  const updatedProfile = {
    ...originalProfile,
    password: password.value || null
  }
  console.log('Updating profile:', updatedProfile)

  try {
    console.log('API URL', `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update`)
    console.log('Headers:', {
      'Content-Type': 'application/json',
      authorization: `Bearer ${authService.getAccessToken()}`
    })
    console.log('Body:', JSON.stringify(updatedProfile))
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authService.getAccessToken()}`
      },
      body: JSON.stringify(updatedProfile)
    })
    console.log('Response Status:', response.status)
    if (!response.ok) {
      const error = await response.json()
      console.error('Failed to update profile:', error)
      alert(`Failed to update profile: ${error.message || 'Unknown error'}`)
      return
    }

    const updatedUser = await response.json()
    store.user = updatedUser
    alert('Profile updated successfully!')
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Error updating profile. Please try again later.')
  } finally {
    isLoading.value = false
  }
}

const handleAccountDeleteClick = async () => {
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
    store.logout()
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Error deleting account:', error)
    alert('Error deleting account. Please try again later.')
  }
}

const handleDeclineChangesClick = () => {
  if (confirm('Are you sure you want to cancel the changes? Unsaved changes will be lost.')) {
    Object.assign(store.user, originalProfile)
  } else {
    alert('Decline failed!')
  }
}
</script>

<template>
  <div class="app-container">
    <TheContainer>
      <h2>
        <slot name="heading">Edit Profile</slot>
      </h2>

      <form @submit.prevent="handleProfileUpdateClick">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              type="text"
              v-model="originalProfile.first_name"
              class="input"
              placeholder="Name"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input
              type="text"
              v-model="originalProfile.username"
              class="input"
              placeholder="Username"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              type="email"
              v-model="originalProfile.email"
              class="input"
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">New Password (leave blank to keep current password)</label>
          <div class="control">
            <input
              type="password"
              v-model="password"
              class="input"
              placeholder="New Password"
              minlength="8"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Confirm New Password</label>
          <div class="control">
            <input
              type="password"
              v-model="confirmPassword"
              class="input"
              placeholder="Confirm New Password"
              minlength="8"
            />
            <p v-if="password !== confirmPassword" class="help is-danger">
              Passwords do not match.
            </p>
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
      </form>

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

.mt-5 {
  margin-top: 2rem;
}
</style>
