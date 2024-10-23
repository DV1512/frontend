<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { passwordLogin, getUser, GetUserByFilter } from 'sdk'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const handleGoogleLoginClick = () => {
  console.log('Google login button clicked')
  window.location.href = 'http://localhost:9999/api/v1/oauth/google/login' // TODO: Check if we can do this via the SDK instead, helps preserve the SPA feel of the app
}

const handleGithubLoginClick = () => {
  console.log('GitHub login button clicked')
  window.location.href = 'http://localhost:9999/api/v1/oauth/github/login' // TODO: Same as above
}

const emailOrUsername = ref('')
const password = ref('')

const handleLoginClick = async () => {
  try {
    const token = await passwordLogin(emailOrUsername.value, password.value)
    console.log('Token:', token)
    const filter = new GetUserByFilter(undefined, undefined, token.access_token)
    const user = await getUser(token.access_token, filter)
    console.log('User logged in:', user)
    router.push('/home')
  } catch (error) {
    console.error('Error logging in:', error)
  }
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
              Login with Google
            </button>
          </div>
          <div class="column is-narrow">
            <button class="button is-primary custom-button" @click="handleGithubLoginClick">
              <Icon icon="mdi:github" class="icon" />
              Login with GitHub
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
  width: 250px;
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
