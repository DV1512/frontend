<script lang="ts">
import AButton from '../components/Button.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AButton
  },
  methods: {
    handleGoogleLoginClick() {
      console.log('Google login button clicked')
      // Redirect to the updated Google OAuth login URL with API versioning
      window.location.href = 'http://localhost:9999/api/v1/oauth/google/login'
    },
    handleGithubLoginClick() {
      console.log('GitHub login button clicked')
      // Redirect to the updated GitHub OAuth login URL with API versioning
      window.location.href = 'http://localhost:9999/api/v1/oauth/github/login'
    }
  }
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>

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
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<style scoped>
/* Style specific to Google login button */
.google-login-btn {
  margin-top: 0.625rem; /* 10px = 0.625rem */
  padding: 0.625rem 1.25rem; /* 10px = 0.625rem, 20px = 1.25rem */
  border-radius: 15px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

/* Hover effect for Google button */
.google-login-btn:hover {
  background-color: #357ae8;
}

/* Style specific to GitHub login button */
.github-login-btn {
  margin-top: 0.625rem; /* 10px = 0.625rem */
  padding: 0.625rem 1.25rem; /* 10px = 0.625rem, 20px = 1.25rem */
  border-radius: 15px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

/* Hover effect for GitHub button */
.github-login-btn:hover {
  background-color: #24292e;
}
</style>
