<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheContainer from '@/components/TheContainer.vue'
import { computed } from 'vue'
import { userStore } from './stores/userStore'
//import { ref, computed } from 'vue'

const store = userStore()
const welcomeMessage = computed(() => {
  return store.isLoggedIn && store.user?.first_name
    ? `Welcome, ${store.user.first_name}!`
    : 'to ThreatMapper AI'
})
/*const user = ref({
  isLoggedIn: store.isLoggedIn, // Assuming the store has an `isLoggedIn` property
  name: store.user?.first_name // Fetching user's first name from the store
})*/

/*const welcomeMessage = computed(() => {
  return user.value.isLoggedIn ? `Welcome, ${user.value.name}!` : "";
})*/
</script>

<template>
  <div class="app-container">
    <TheContainer>
      <div class="content">
        <h1>{{ welcomeMessage }}</h1>
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
}

.mt-5 {
  margin-top: 2rem;
}
</style>
