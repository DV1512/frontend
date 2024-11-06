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
      usernameError: '',
      passwordError: '',
      loginError: ''
    }
  },
  computed: {
    ...mapState(userStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(userStore, ['login']),

    async loginUser() {
      this.usernameError = ''
      this.passwordError = ''
      this.loginError = ''

      if (!this.username) {
        this.usernameError = 'Please enter a username or email'
        return
      }

      if (!this.password) {
        this.passwordError = 'Please enter a password'
        return
      }

      try {
        await this.login(this.username, this.password)
        this.$router.push({ name: 'home' })
      } catch (error) {
        // Set an error message if login fails
        this.loginError = 'Incorrect username or password.'
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
          <p v-if="usernameError" class="help is-danger">{{ usernameError }}</p>
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

      <p v-if="loginError" class="help is-danger">{{ loginError }}</p>

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
