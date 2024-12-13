<script>
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import ScrollUp from './components/ScrollUp.vue'
import '@/assets/main.scss'

export default {
  components: {
    AppNavbar,
    AppFooter,
    ScrollUp
  }
}
</script>

<template>
  <div class="app-container">
    <AppNavbar />

    <main class="section main-container">
      <router-view />
    </main>

    <ScrollUp />

    <AppFooter />
  </div>
</template>
