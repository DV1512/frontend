<script lang="ts">
import { userStore } from './stores/userStore'
import { mapState, mapActions } from 'pinia'
import TheContainer from '@/components/TheContainer.vue'
import { userStore } from './stores/userStore'

const store = userStore()
const router = useRouter()
const confirmPassword = ref('')
const password = ref('')

if (store.user == null) {
  router.push({ name: 'error' })
}

const handleProfileUpdateClick = () => {
  if (password.value && password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  // TODO: Implement the updated profile data and send to the backend server.
  // Make sure to send the updated name, username, email, and optionally the new password.  })
}

const handleAccountDeleteClick = () => {
  const confirmation = confirm(
    'Are you sure you want to delete your account? This action is irreversible.'
  )
  if (confirmation) {
    // TODO: Implement the logic to delete the user's account from the system.
  }
}

const handleDeclineChangesClick = () => {
  const confirmation = confirm(
    'Are you sure you want to cancel the changes? Unsaved changes will be lost.'
  )
  if (confirmation) {
    // TODO: implement this later
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
            @click="handleProfileUpdateClick"
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
          <button @click="handleDelete" class="button is-primary custom-button">
            Delete Account
          </button>
        </div>
        <div class="column is-narrow">
          <button @click="themeStore.toggleTheme" class="button is-primary custom-button">
            <span>{{ themeStore.isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
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
