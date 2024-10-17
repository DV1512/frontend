<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

// Define the methods for handling button clicks
const handleGoogleLoginClick = () => {
  console.log('Google login button clicked')
  // Redirect to the updated Google OAuth login URL with API versioning
  window.location.href = 'http://localhost:9999/api/v1/oauth/google/login'
}

const handleGithubLoginClick = () => {
  console.log('GitHub login button clicked')
  // Redirect to the updated GitHub OAuth login URL with API versioning
  window.location.href = 'http://localhost:9999/api/v1/oauth/github/login'
}

// Define reactive variables for email/username and password
const emailOrUsername = ref('')
const password = ref('')

// Define the method for handling the login button click
const handleLoginClick = () => {
  console.log('Login button clicked')
  // Add your login logic here
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Login Page</h1>

      <div class="box">
        <div class="field">
          <label class="label">Email or Username</label>
          <div class="control">
            <input
              type="text"
              v-model="emailOrUsername"
              class="input"
              placeholder="Email or Username"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input type="password" v-model="password" class="input" placeholder="Password" />
          </div>
        </div>

        <div class="columns is-centered mt-5">
          <div class="column is-narrow">
            <button class="button is-primary custom-button" @click="handleLoginClick">Login</button>
          </div>
        </div>

        <h2 class="has-text-centered mt-5">Or login with:</h2>

        <div class="columns is-centered mt-5">
          <div class="column is-narrow">
            <button class="button is-primary custom-button" @click="handleGoogleLoginClick">
              <Icon icon="logos:google-icon" class="icon" />
              Sign Up with Google
            </button>
          </div>
          <div class="column is-narrow">
            <button class="button is-primary custom-button" @click="handleGithubLoginClick">
              <Icon icon="mdi:github" class="icon" />
              Sign Up with GitHub
            </button>
          </div>
        </div>
        <div class="has-text-centered mt-5">
          <p>Don't have an account? <RouterLink to="/signup">Sign up here</RouterLink></p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-button {
  width: 250px; /* Adjust the width as needed */
  margin: 0 80px; /* Add horizontal margin to create space between buttons */
}

.icon {
  margin-right: 10px;
  font-size: 1.5rem; /* Adjust the size of the icons */
}

.mt-5 {
  margin-top: 2rem;
}
</style>
