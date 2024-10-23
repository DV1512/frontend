<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Method to handle profile updates
const handleProfileUpdateClick = () => {
  if (password.value && password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  // Handle profile update logic (send updated data to the server)
  console.log('Profile updated with:', {
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value ? password.value : 'No password change'
  })
  // Add code to make an API call to update the user's profile
}

// Method to handle account deletion
const handleAccountDeleteClick = () => {
  const confirmation = confirm(
    'Are you sure you want to delete your account? This action is irreversible.'
  )
  if (confirmation) {
    // Add code to make an API call to delete the user's account
    console.log('Account deleted')
  }
}

// Method to handle declining (canceling) changes
const handleDeclineChangesClick = () => {
  const confirmation = confirm(
    'Are you sure you want to cancel the changes? Unsaved changes will be lost.'
  )
  if (confirmation) {
    // Reset the form fields to their previous values or leave empty if no previous values
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
  <section class="section">
    <div class="Thecontainer">
      <div class="box">
        <h2>
          <slot name="heading">Edit Profile</slot>
        </h2>

        <!-- Profile form content -->
        <form @submit.prevent="handleProfileUpdateClick">
          <!-- Name Field -->
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input type="text" v-model="name" class="input" placeholder="Name" required />
            </div>
          </div>

          <!-- Username Field -->
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input type="text" v-model="username" class="input" placeholder="Username" required />
            </div>
          </div>

          <!-- Email Field -->
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input type="email" v-model="email" class="input" placeholder="Email" required />
            </div>
          </div>

          <!-- Password Fields (optional) -->
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

          <!-- Submit Button -->
          <div class="columns is-centered mt-5">
            <div class="column is-narrow">
              <button type="submit" class="button is-primary custom-button">Update Profile</button>
            </div>
          </div>
        </form>

        <!-- Additional Actions: Decline and Delete Account -->
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
      </div>
    </div>
  </section>
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
