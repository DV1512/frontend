<script setup lang="ts">
import WelcomeItem from '../components/WelcomeItem.vue'
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <WelcomeItem>
          <template #heading>ThreatMapper</template>

          Vue’s
          <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
          provides you with all information you need to get started.
        </WelcomeItem>

        <div class="columns is-centered mt-5">
          <div class="column is-narrow">
            <RouterLink to="/login">
              <button class="button is-primary custom-button">Login</button>
            </RouterLink>
          </div>

          <div class="column is-narrow">
            <RouterLink to="/signup">
              <button class="button is-primary custom-button">Sign Up</button>
            </RouterLink>
          </div>
        </div>
        <div class="text-snippet mt-5">
          <p>
            ThreatMapper is a web application that helps you visualize and manage your security
            threats.
          </p>
        </div>
        <div class="columns is-centered mt-5">
          <div class="column is-narrow">
            <RouterLink to="/about">
              <button class="button is-primary custom-button">Continue as Guest</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom styles */
.custom-button {
  width: 250px; /* Adjust the width as needed */
  margin: 0 80px; /* Add horizontal margin to create space between buttons */
}

.text-snippet {
  text-align: center; /* Center the text */
  margin-top: 2rem; /* Add space between the buttons and the text */
}
</style>
