<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import AButton from '../components/Button.vue'

// Define the methods for handling button clicks
const handleGoogleLoginClick = () => {
  console.log('Google login button clicked')
  // Redirect to the updated Google OAuth login URL with API versioning
  window.location.href = 'http://localhost:9999/api/v1/oauth/google/login'
}

const handleGithubLoginClick = () => {
  console.log('GitHub login button clicked')
  // Redirect to the updated GitHub OAuth login URL with API versioning
  window.location.href = 'http://localhost:9999/api/v1/oauth/github/login'
}
</script>

<template>
  <WelcomeItem>
    <template #heading>ThreatMapper</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>

  <div class="button-container">
    <section>
      <RouterLink to="/loginView">
        <AButton
          text="Login with Google"
          customClass="google-login-btn"
          :customStyle="{ backgroundColor: '#4285F4', color: 'white' }"
        />
      </RouterLink>
    </section>

    <section>
      <RouterLink to="/signup">
        <AButton
          text="Sign Up with GitHub"
          customClass="github-login-btn"
          :customStyle="{ backgroundColor: '#333', color: 'white' }"
        />
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between; /* Space between the buttons */
  align-items: center; /* Center the buttons vertically */
  margin-top: 2rem; /* Add some space above the buttons */
}

section {
  flex: 1;
  display: flex;
  justify-content: center; /* Center the buttons within their sections */
}

.google-login-btn {
  width: 100%; /* Ensure the button takes full width of its section */
  max-width: 200px; /* Set a max width for the button */
}

.github-login-btn {
  width: 100%; /* Ensure the button takes full width of its section */
  max-width: 200px; /* Set a max width for the button */
}
</style>
