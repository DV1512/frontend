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
            <button class="button is-primary custom-button" @click="handleLogoutClick">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div class="box">Welcome.</div>
      <header class="header">
        <nav class="nav">
          <ul>
            <li><button class="button is-primary">About</button></li>
            <li><button class="button is-small">Button</button></li>
            <li><a href="#">Documentation</a></li>
          </ul>
        </nav>
      </header>
      <main class="main-content">
        <h1>ThreatMapper</h1>
        <h2>Welcome</h2>
        <p>Short info about the web<br />Wellcome to ThreatMapper chatbot.</p>
        <p>To continue, scroll down<br />or</p>

        <p>
          Press Here to start a conversation, however the service will not be limited but saved.
        </p>
        <button class="Chat-btn">Start a Chat</button>
      </main>
      <footer class="footer">
        <p>
          More Info<br />
          What? How? Why?
        </p>
        <p>Terms of service, contact, other links?</p>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.WellcomeView {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
}

.header {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.nav {
  display: flex;
  justify-content: space-between;
}

.nav ul {
  display: flex;
  gap: 1rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.footer {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.Chat-btn {
  margin-right: 10px;
  font-size: 1.5rem; /* Adjust the size of the icons */
}
.mt-5 {
  margin-top: 2rem;
}
</style>
