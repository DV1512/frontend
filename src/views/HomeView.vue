<script lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import AButton from '../components/Button.vue'

export default {
  components: {
    TheWelcome,
    AButton,
    AButton
  },
  methods: {
    handleLoginClick() {
      console.log('Login button clicked')
      window.location.href = 'http://192.168.1.234:9999/oauth/google/login'
      // window.location.href = 'http://localhost:9999/oauth/google/login';
    }
  }
}
</script>

<template>
  <main>
    <TheWelcome />
    <AButton text="Google test" customClass="my-custom-class" @click="handleLoginClick" />
    <AButton text="GitHub test" customClass="my-custom-class" @click="handleLoginClick" />
  </main>
</template>
