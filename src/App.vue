<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import '@/assets/main.scss' // Ensure you import your custom main.scss
</script>

<template>
  <div class="app-container">
    <AppNavbar />

    <main class="section main-container">
      <TheContainer>
        <RouterView />
      </TheContainer>
    </main>

    <footer class="footer has-text-centered">
      <div class="content">
        <p>Terms of service, contact, other links?</p>
      </div>
    </footer>
  </div>
</template>
