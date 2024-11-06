<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { userStore } from './stores/userStore'

export default {
  components: {
    Icon,
    RouterLink
  },
  data() {
    return {
      username: '',
      password: '',
      passwordError: ''
    }
  },
  computed: {
    ...mapState(userStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(userStore, ['login']),

    // This is not supposed to be here, it should be in sign up view
    // We should have something with wrong username or password here
    validatePassword(password: string) {
      const minLength = 8
      const hasUpperCase = /[A-Z]/.test(password)
      const hasLowerCase = /[a-z]/.test(password)
      const hasNumber = /\d/.test(password)
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

      if (password.length < minLength) {
        return `Password must be at least ${minLength} characters long.`
      }
      if (!hasUpperCase) {
        return 'Password must contain at least one uppercase letter.'
      }
      if (!hasLowerCase) {
        return 'Password must contain at least one lowercase letter.'
      }
      if (!hasNumber) {
        return 'Password must contain at least one number.'
      }
      if (!hasSpecialChar) {
        return 'Password must contain at least one special character.'
      }
      return ''
    },

    async loginUser() {
      // Run password validation
      this.passwordError = this.validatePassword(this.password)
      if (this.passwordError) {
        console.warn(this.passwordError)
        return // Stop the login process if validation fails
      }

      try {
        await this.login(this.username, this.password)
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
    },

    handleGoogleLoginClick() {
      console.log('Google login button clicked')
      window.location.href = 'http://localhost:9999/api/v1/oauth/google/login' // TODO: Check if we can do this via the SDK instead, helps preserve the SPA feel of the app
    },

    handleGithubLoginClick() {
      console.log('GitHub login button clicked')
      window.location.href = 'http://localhost:9999/api/v1/oauth/github/login' // TODO: Same as above
    }
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
            <input type="text" v-model="username" class="input" placeholder="Email" />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input type="password" v-model="password" class="input" placeholder="Password" />
          </div>
          <p v-if="passwordError" class="help is-danger">{{ passwordError }}</p>
        </div>

        <div class="columns is-centered mt-5">
          <div class="column is-narrow">
            <button class="button is-primary custom-button" @click="loginUser">Login</button>
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
