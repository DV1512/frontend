<script setup lang="ts">
import { ref } from 'vue'
import TheContainer from '@/components/TheContainer.vue'

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

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
    name.value = ''
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    console.log('Changes declined and form reset')
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
            <input type="text" v-model="name" class="input" placeholder="Name" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input type="text" v-model="username" class="input" placeholder="Username" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input type="email" v-model="email" class="input" placeholder="Email" required />
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
          </div>
        </div>

        <div class="columns is-centered mt-5">
          <div class="column is-narrow">
            <button type="submit" class="button is-primary custom-button">Update Profile</button>
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
