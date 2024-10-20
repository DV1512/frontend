<script setup lang="ts">
function handleLogoutClick() {
  console.log('Logging out...')
  // Add your logout logic here
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Welcome Page</h1>
      <div class="box">
        <div class="columns is-centered mt-5">
          <div class="column is-narrow">
            <button class="button is-primary" @click="handleLogoutClick">Logout</button>
          </div>
        </div>
      </div>
      <div class="box">Welcome.</div>
      <header class="header">
        <nav class="navbar">
          <div class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item">About</a>
              <a class="navbar-item">Button</a>
              <a class="navbar-item">Documentation</a>
            </div>
          </div>
        </nav>
      </header>
      <main class="main-content">
        <h1 class="title">ThreatMapper</h1>
        <h2 class="subtitle">Welcome</h2>
        <p>Short info about the web<br />Welcome to ThreatMapper chatbot.</p>
        <p>To continue, scroll down<br />or</p>
        <p>
          Press Here to start a conversation, however the service will not be limited but saved.
        </p>
        <button class="button is-link is-large">Start a Chat</button>
      </main>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>More Info<br />What? How? Why?</p>
          <p>Terms of service, contact, other links?</p>
        </div>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.header {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.main-content {
  padding: 2rem;
}

.footer {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.mt-5 {
  margin-top: 2rem;
}
</style>
