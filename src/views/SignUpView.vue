<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

// Define the methods for handling button clicks
const handleGoogleSignUpClick = () => {
  console.log('Google signin button clicked')
  // Redirect to the updated Google OAuth login URL with API versioning
  window.location.href = 'http://localhost:9999/api/v1/oauth/google/signin'
}

const handleGithubSignUpClick = () => {
  console.log('GitHub login button clicked')
  // Redirect to the updated GitHub OAuth login URL with API versioning
  window.location.href = 'http://localhost:9999/api/v1/oauth/github/signin'
}

// Define reactive variables for email/username and password
const name = ref('')
const Username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Define the method for handling the signup button click
const handleSignUpClick = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  console.log('Sign Up button clicked')
  // Add your sign up logic here
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Sign Up</h1>

      <div class="box">
        <form @submit.prevent="handleSignUpClick">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input type="email" v-model="email" class="input" placeholder="Email" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input type="text" v-model="Username" class="input" placeholder="Username" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                type="password"
                v-model="password"
                class="input"
                placeholder="Password"
                required
                minlength="8"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control">
              <input
                type="password"
                v-model="confirmPassword"
                class="input"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>

          <div class="columns is-centered mt-5">
            <div class="column is-narrow">
              <button type="submit" class="button is-primary custom-button">Sign Up</button>
            </div>
          </div>
        </form>

        <h2 class="has-text-centered mt-5">Or Sign Up with:</h2>

        <div class="columns is-centered mt-5">
          <div class="column is-narrow">
            <button class="button is-primary custom-button" @click="handleGoogleSignUpClick">
              <Icon icon="logos:google-icon" class="icon" />
              Sign Up with Google
            </button>
          </div>
          <div class="column is-narrow">
            <button class="button is-primary custom-button" @click="handleGithubSignUpClick">
              <Icon icon="mdi:github" class="icon" />
              Sign Up with GitHub
            </button>
          </div>
        </div>

        <!-- Text with Link to Login Page -->
        <div class="has-text-centered mt-5">
          <p>
            Already have an account?
            <RouterLink to="/login" class="has-text-link">Log in here</RouterLink>.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-button {
  background-color: white;
  color: black;
  border: 1px solid black;
  width: 250px; /* Adjust the width as needed */
}

.mt-5 {
  margin-top: 2rem;
}

.icon {
  margin-left: 10px; /* Adjust the margin to move the icon to the left */
  font-size: 1rem; /* Adjust the size of the icons */
}
</style>
