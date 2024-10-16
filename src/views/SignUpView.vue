<script setup lang="ts">
import { ref } from 'vue'
import AButton from '../components/Button.vue'
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

// Define the method for handling the login button click
const handleSignUpClick = () => {
  console.log('Login button clicked')
  // Add your login logic here
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Sign Up Page</h1>

      <div class="box">
        <form @submit.prevent="handleSignUpClick">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input type="email" v-model="email" class="input" placeholder="Email" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input type="text" v-model="name" class="input" placeholder="Name" required />
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
              <AButton
                text="Sign Up"
                customClass="button is-primary custom-button"
                :customStyle="{
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black'
                }"
                type="submit"
              />
            </div>
          </div>
        </form>

        <h2 class="has-text-centered mt-5">Or Sign Up with:</h2>

        <div class="columns is-centered mt-5">
          <div class="column is-narrow">
            <AButton
              text="Sign Up with Google"
              customClass="button is-primary custom-button"
              :customStyle="{ backgroundColor: 'white', color: 'black', border: '1px solid black' }"
              @click="handleGoogleSignUpClick"
            >
              <template #icon>
                <Icon icon="logos:google-icon" class="icon" />
              </template>
            </AButton>
          </div>
          <div class="column is-narrow">
            <AButton
              text="Sign Up with GitHub"
              customClass="button is-primary custom-button"
              :customStyle="{ backgroundColor: 'white', color: 'black', border: '1px solid black' }"
              @click="handleGithubSignUpClick"
            >
              <template #icon>
                <Icon icon="mdi:github" class="icon" />
              </template>
            </AButton>
          </div>
        </div>
        <!-- Text with Link to Login Page -->
        <div class="has-text-centered mt-5">
          <p>
            Already have an account?
            <RouterLink to="/loginView" class="has-text-link">Log in here</RouterLink>.
          </p>
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
