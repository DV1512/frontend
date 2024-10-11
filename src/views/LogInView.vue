<script setup lang="ts">
import { ref } from 'vue'
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

// Define reactive variables for email/username and password
const emailOrUsername = ref('')
const password = ref('')

// Define the method for handling the login button click
const handleLoginClick = () => {
  console.log('Login button clicked')
  // Add your login logic here
}
</script>

<template>
  <div class="logInView">
    <h1>Login Page</h1>

    <div class="input-container">
      <input
        type="text"
        v-model="emailOrUsername"
        placeholder="Email or Username"
        class="input-field"
      />
      <input type="password" v-model="password" placeholder="Password" class="input-field" />
      <AButton
        text="Login"
        customClass="login-btn"
        :customStyle="{ backgroundColor: '#4285F4', color: 'white' }"
        @click="handleLoginClick"
      />
    </div>

    <h4>Or login with:</h4>
    <div class="button-container">
      <section>
        <AButton
          text="Login with Google"
          customClass="google-login-btn"
          :customStyle="{ backgroundColor: '#4285F4', color: 'white' }"
          @click="handleGoogleLoginClick"
        />
      </section>

      <section>
        <AButton
          text="Login with GitHub"
          customClass="github-login-btn"
          :customStyle="{ backgroundColor: '#333', color: 'white' }"
          @click="handleGithubLoginClick"
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
.logInView {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
}

.input-field {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.button-container {
  display: flex;
  justify-content: space-between; /* Space between the buttons */
  align-items: center; /* Center the buttons vertically */
  width: 100%;
  max-width: 400px;
}

section {
  flex: 1;
  display: flex;
  justify-content: center; /* Center the buttons within their sections */
}

.google-login-btn,
.github-login-btn {
  width: 100%; /* Ensure the button takes full width of its section */
  max-width: 200px; /* Set a max width for the button */
}

.login-btn {
  width: 50%; /* Ensure the button takes full width of its section */
  max-width: 100px; /* Set a max width for the button */
  margin: 0 auto; /* Center the button */
}
</style>
