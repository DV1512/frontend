<script lang="ts">
import authService from './services/authService'
import { mapActions } from 'pinia'
import { userStore } from './stores/userStore'

export default {
  computed: {
    accessToken() {
      const token = this.$route.query.token
      return token && token.length > 0 ? token : null
    }
  },
  methods: {
    ...mapActions(userStore, ['getUserInfo'])
  },

  mounted() {
    const token = this.accessToken
    if (token != null) {
      authService.setAccessToken(token)
      this.getUserInfo(token)
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<template>
  <h1>Redirecting</h1>
</template>
