<script lang="ts">
import { mapState } from 'pinia'
import TheContainer from '@/components/TheContainer.vue'
import { userStore } from './stores/userStore'

export default {
  components: {
    TheContainer
  },
  computed: {
    ...mapState(userStore, ['isLoggedIn', 'user']),
    welcomeMessage() {
      return 'Press the button below to start chatting.'
    }
  }
}
</script>

<template>
  <div class="app-container">
    <TheContainer>
      <template #heading>Welcome {{ user?.username }}!</template>
      <div class="columns is-centered">
        <h1>{{ welcomeMessage }}</h1>
      </div>
      <div class="columns is-centered mt-5">
        <RouterLink to="/chat">
          <button class="button is-primary custom-button">Start chat</button>
        </RouterLink>
      </div>
    </TheContainer>
  </div>
</template>

<style scoped>
.custom-button {
  width: 250px;
  margin: 0 80px;
  margin-bottom: 1rem;
}

.mt-5 {
  margin-top: 2rem;
}
</style>
