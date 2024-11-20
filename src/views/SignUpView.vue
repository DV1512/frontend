<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { RouterLink } from 'vue-router'
import { userStore } from './stores/userStore'
import TheContainer from '@/components/TheContainer.vue'
import OAuthButton from '@/components/OAuthButton.vue'

export default {
  components: {
    RouterLink,
    TheContainer,
    OAuthButton
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: '',
      emailError: '',
      usernameError: '',
      firstNameError: '',
      lastNameError: ''
    }
  },
  methods: {
    ...mapActions(userStore, ['signup']),

    validateFirstName(firstName: string) {
      if (!firstName) {
        return 'First name is required.'
      }
      return ''
    },
    validateLastName(lastName: string) {
      if (!lastName) {
        return 'Last name is required.'
      }
      return ''
    },

    validateEmail(email: string) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(email)) {
        return 'Please enter a valid email address.'
      }
      return ''
    },

    validateUsername(username: string) {
      if (!username) {
        return 'Username is required.'
      }
      return ''
    },

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

    validateConfirmPassword(password: string, confirmPassword: string) {
      if (password !== confirmPassword) {
        return 'Passwords do not match.'
      }
      return ''
    },

    async signUpUser() {
      this.firstNameError = this.validateFirstName(this.firstName)
      this.lastNameError = this.validateLastName(this.lastName)
      this.emailError = this.validateEmail(this.email)
      this.usernameError = this.validateUsername(this.username)
      this.passwordError = this.validatePassword(this.password)
      this.confirmPasswordError = this.validateConfirmPassword(this.password, this.confirmPassword)

      if (
        this.firstNameError ||
        this.lastNameError ||
        this.emailError ||
        this.usernameError ||
        this.passwordError ||
        this.confirmPasswordError
      ) {
        console.warn('Validation errors:', {
          firstName: this.firstNameError,
          lastName: this.lastNameError,
          email: this.emailError,
          username: this.usernameError,
          password: this.passwordError,
          confirmPassword: this.confirmPasswordError
        })
        return
      }

      try {
        await this.signup(this.username, this.email, this.firstName, this.lastName, this.password)
        this.$router.push({ name: 'login' })
      } catch (error) {
        console.error('Sign-up failed:', error)
      }
    },
    handleOAuthClick(method: string) {
      if (method === 'handleGoogleSignUpClick') {
        window.location.href = 'http://localhost:9999/api/v1/oauth/google/signup'
      } else if (method === 'handleGithubSignUpClick') {
        window.location.href = 'http://localhost:9999/api/v1/oauth/github/signup'
      }
    }
  }
}
</script>

<template>
  <div class="app-container">
    <TheContainer>
      <template #heading>Sign Up</template>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input
              type="text"
              v-model="firstName"
              class="input"
              placeholder="First Name"
              required
            />
          </div>
          <p v-if="firstNameError" class="help is-danger">{{ firstNameError }}</p>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input type="text" v-model="lastName" class="input" placeholder="Last Name" required />
          </div>
          <p v-if="lastNameError" class="help is-danger">{{ lastNameError }}</p>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input type="email" v-model="email" class="input" placeholder="Email" required />
          </div>
          <p v-if="emailError" class="help is-danger">{{ emailError }}</p>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input type="text" v-model="username" class="input" placeholder="Username" required />
          </div>
          <p v-if="usernameError" class="help is-danger">{{ usernameError }}</p>
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
              required
              minlength="8"
            />
          </div>
          <p v-if="passwordError" class="help is-danger">{{ passwordError }}</p>
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
              required
              @keyup.enter="signUpUser"
            />
          </div>
          <p v-if="confirmPasswordError" class="help is-danger">{{ confirmPasswordError }}</p>
        </div>
      </div>

      <div class="columns is-centered mt-5">
        <div class="column is-narrow">
          <button class="button is-primary custom-button" @click="signUpUser">Sign Up</button>
        </div>
      </div>

      <h2 class="has-text-centered mt-5">Or Sign Up with:</h2>

      <div class="columns is-centered mt-5">
        <OAuthButton provider="google" action="signup" @click="handleOAuthClick" />
        <OAuthButton provider="github" action="signup" @click="handleOAuthClick" />
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

.mt-5 {
  margin-top: 2rem;
}
</style>
