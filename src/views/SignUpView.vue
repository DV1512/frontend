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
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: ''
    }
  },
  computed: {
    ...mapState(userStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(userStore, ['signup']),
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

    async signUpUser() {
      this.passwordError = this.validatePassword(this.password)
      if (this.passwordError) {
        console.warn(this.passwordError)
        return
      }

      try {
        await this.signup(this.username, this.email, this.password)
        this.$router.push({ name: 'login' })
      } catch (error) {
        console.error('Sign-up failed:', error)
      }
    },
    handleGoogleSignUpClick() {
      console.log('Google sign-up button clicked')
      window.location.href = 'http://localhost:9999/api/v1/oauth/google/signup'
    },

    handleGithubSignUpClick() {
      console.log('GitHub sign-up button clicked')
      window.location.href = 'http://localhost:9999/api/v1/oauth/github/signup'
    }
  }
}
</script>

<template>
  <div class="app-container">
    <TheContainer>
      <template #heading>Signup</template>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input type="email" v-model="email" class="input" placeholder="Email" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input type="text" v-model="username" class="input" placeholder="Username" required />
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
      <p v-if="passwordError" class="help is-danger">{{ passwordError }}</p>

      <div class="columns is-centered mt-5">
        <div class="column is-narrow">
          <button class="button is-primary custom-button" @click="signUpUser">Sign Up</button>
        </div>
      </div>

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

      <div class="has-text-centered mt-5">
        <p>
          Already have an account?
          <RouterLink to="/login" class="has-text-link">Log in here</RouterLink>.
        </p>
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

.icon {
  margin-right: 10px;
  font-size: 1.5rem;
}
</style>
