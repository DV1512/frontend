<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { userStore } from './stores/userStore'
import TheContainer from '@/components/TheContainer.vue'

export default {
  components: {
    Icon,
    RouterLink,
    TheContainer
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
  <div class="app-container">
    <TheContainer>
      <template #heading>Login</template>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Email or Username</label>
          <div class="control">
            <input type="text" v-model="username" class="input" placeholder="Email" />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input type="password" v-model="password" class="input" placeholder="Password" />
          </div>
          <p v-if="passwordError" class="help is-danger">{{ passwordError }}</p>
        </div>
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
            <span class="button-content">
              <Icon icon="logos:google-icon" class="icon" />
              <span>Login with Google</span>
            </span>
          </button>
        </div>
        <div class="column is-narrow">
          <button class="button is-primary custom-button" @click="handleGithubLoginClick">
            <span class="button-content">
              <Icon icon="mdi:github" class="icon" />
              <span>Login with GitHub</span>
            </span>
          </button>
        </div>
      </div>
      <div class="has-text-centered mt-5">
        <p>Don't have an account? <RouterLink to="/signup">Sign up here</RouterLink></p>
      </div>
    </TheContainer>
  </div>
</template>

<style scoped>
.field {
  width: 70%;
  margin-top: 1.5rem;
}

.custom-button {
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  margin-right: 10px;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mt-5 {
  margin-top: 2rem;
}
</style>
