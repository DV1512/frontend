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

    handleOAuthClick(method: string) {
      if (method === 'handleGoogleLoginClick') {
        window.location.href = 'http://localhost:9999/api/v1/oauth/google/login'
      } else if (method === 'handleGithubLoginClick') {
        window.location.href = 'http://localhost:9999/api/v1/oauth/github/login'
      }
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
        <OAuthButton provider="google" action="login" @click="handleOAuthClick" />
        <OAuthButton provider="github" action="login" @click="handleOAuthClick" />
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

.mt-5 {
  margin-top: 2rem;
}
</style>
