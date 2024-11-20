<script lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { userStore } from '../views/stores/userStore'

export default {
  components: {
    RouterLink,
    Icon
  },
  data() {
    return {
      logoutError: ''
    }
  },
  computed: {
    isLoggedIn() {
      const store = userStore()
      return store.isLoggedIn
    }
  },
  methods: {
    async handleLogout() {
      this.logoutError = ''
      try {
        const UserStore = userStore()
        await UserStore.logout()
        console.log('Logout successful')
        this.$router.push({ name: 'login' })
      } catch (error) {
        this.logoutError = 'An error occurred during logout. Please try again.'
        console.error('Logout failed:', error)
      }
    }
  }
}
</script>

<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink to="/">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </RouterLink>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <RouterLink to="/" class="navbar-item">Home</RouterLink>
        <div class="navbar-item has-dropdown is-hoverable">
          <p class="navbar-link">About</p>
          <div class="navbar-dropdown">
            <RouterLink to="/team" class="navbar-item">The Team</RouterLink>
            <hr class="navbar-divider" />
            <RouterLink to="/ai" class="navbar-item">ThreatMapperAI</RouterLink>
            <hr class="navbar-divider" />
            <RouterLink to="/background" class="navbar-item">Background</RouterLink>
          </div>
        </div>

        <RouterLink to="/howto" class="navbar-item">How to Use</RouterLink>
        <RouterLink to="/documentation" class="navbar-item">Documentation</RouterLink>
      </div>
      <div v-if="isLoggedIn" class="navbar-end">
        <RouterLink to="/profile" class="navbar-item">
          <Icon icon="mdi:account" class="icon-size" />
        </RouterLink>
        <RouterLink to="/settings" class="navbar-item">
          <Icon icon="mdi:cog" class="icon-size" />
        </RouterLink>
        <button class="navbar-item" @click.prevent="handleLogout">
          <Icon icon="mdi:logout" class="icon-size" />
        </button>
      </div>
      <div v-else class="navbar-end">
        <RouterLink to="/login" class="navbar-item">Login</RouterLink>
        <RouterLink to="/signup" class="navbar-item">Sign Up</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  width: 80px;
  height: auto;
  margin-right: 10px;
  margin-top: 5px;
  margin-left: 10px;
  border-radius: 10px;
}

.icon-size {
  font-size: 1.5rem;
}
</style>
