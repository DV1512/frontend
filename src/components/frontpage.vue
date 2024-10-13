<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import AButton from '../components/Button.vue'
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="box grey-box">
        <WelcomeItem>
          <template #heading>ThreatMapper</template>

          Vue’s
          <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
          provides you with all information you need to get started.
        </WelcomeItem>

        <div class="columns is-centered mt-5">
          <div class="column is-narrow">
            <RouterLink to="/loginView">
              <AButton
                text="Login"
                customClass="button is-primary custom-button"
                :customStyle="{ backgroundColor: '#4285F4', color: 'white' }"
              />
            </RouterLink>
          </div>

          <div class="column is-narrow">
            <RouterLink to="/signup">
              <AButton
                text="Sign Up"
                customClass="button is-dark custom-button"
                :customStyle="{ backgroundColor: '#333', color: 'white' }"
              />
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
              <AButton
                text="Continue as Guest"
                customClass="button is-info custom-button"
                :customStyle="{ backgroundColor: '#17a2b8', color: 'white' }"
              />
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
  width: 150px; /* Adjust the width as needed */
  margin: 0 80px; /* Add horizontal margin to create space between buttons */
}

.grey-box {
  background-color: #f5f5f5; /* Light grey background */
  padding: 2rem; /* Add padding inside the box */
  border-radius: 8px; /* Optional: Add rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow effect */
}

.text-snippet {
  text-align: center; /* Center the text */
  margin-top: 2rem; /* Add space between the buttons and the text */
}
</style>
