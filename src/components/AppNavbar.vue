<script setup name="AppNavbar">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <!-- Add the logo in the top left corner -->
    <div class="navbar-brand">
      <RouterLink to="/">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </RouterLink>
    </div>

    <!-- Navigation links in the menu bar -->
    <div class="navbar-menu">
      <div class="navbar-start">
        <!-- Dropdown for Home -->
        <RouterLink to="/" class="navbar-item">Home</RouterLink>

        <div class="navbar-item has-dropdown is-hoverable">
          <p class="navbar-link">About</p>
          <div class="navbar-dropdown">
            <RouterLink to="/team" class="navbar-item">The Team</RouterLink>
            <hr class="navbar-divider" />
            <RouterLink to="/ai" class="navbar-item">ThreatMapperAI</RouterLink>
            <hr class="navbar-divider" />
            <RouterLink to="/background" class="navbar-item">Background</RouterLink>
          </div>
        </div>

        <RouterLink to="/howto" class="navbar-item">How to Use</RouterLink>
        <RouterLink to="/documentation" class="navbar-item">Documentation</RouterLink>
      </div>
      <div class="navbar-end">
        <RouterLink to="/profile" class="navbar-item">
          <Icon icon="mdi:account" class="icon-size" />
        </RouterLink>
        <RouterLink to="/settings" class="navbar-item">
          <Icon icon="mdi:cog" class="icon-size" />
        </RouterLink>
        <RouterLink to="/logout" class="navbar-item">
          <Icon icon="mdi:logout" class="icon-size" />
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Custom styles */
.logo {
  width: 80px; /* Size of the logo */
  height: auto;
  margin-right: 10px; /* Space between logo and navigation */
  margin-top: 5px;
  margin-left: 10px;
  border-radius: 10px; /* Rounded corners */
}

/* Custom icon size */
.icon-size {
  font-size: 1.5rem; /* Adjust the size as needed */
}
</style>
