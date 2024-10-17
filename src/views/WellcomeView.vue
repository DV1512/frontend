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
