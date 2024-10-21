<script setup lang="ts"></script>

<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <div class="content">
          <h1>Welcome to</h1>
          <h1 class="title">ThreatMapper AI</h1>
          <RouterLink to="/chat">
            <button class="button is-primary custom-button">Start chat</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-button {
  width: 250px;
  margin: 0 80px;
}
.content {
  text-align: center;
}

.mt-5 {
  margin-top: 2rem;
}
</style>
