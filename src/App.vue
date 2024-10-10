<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <header class="navbar">
    <!-- Add the logo in the top left corner -->
    <img src="@/assets/logo.png" alt="Logo" class="logo" />

     <!-- Navigation links in the menu bar -->
     <nav class="menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/how-to-use">How to Use</RouterLink>
      <RouterLink to="/documentation">Documentation</RouterLink>
    </nav>

    <!--Profile, settings and logout -->
    <div class="icons">
      <Icon icon="mdi:account" />
      <Icon icon="mdi:cog" />
      <Icon icon="mdi:logout" />
    </div>
  </header>

  <!-- Fixed grey/light-dark line -->
  <div class="divider"></div>

  <RouterView />

  <footer>
    <p>Terms of service, contact, other links?</p>
  </footer>
</template>

<style scoped>
/* Full-width navbar */
.navbar {
  padding: 1rem 2rem;
  width: 100%; /* Full width */
  box-sizing: border-box;
  display: flex;
  align-items: center; /* Align items vertically in the center */
}

/* Style for the logo in the top-left corner */
.logo {
  width: 70px; /* Size of the logo */
  height: auto;
  margin-right: 20px; /* Space between logo and navigation */
  border-radius: 10px; /* Rounded corners */
}

.menu {
  display: flex;
  gap: 2rem; /* Space between links */
  padding-top: 40px; /* Move the text down by 15px */
}

/* Styling for the navigation links */
.menu a {
  color: black;
  text-decoration: none;
  font-size: 16px;
}

.menu a:hover {
  color: darkgrey; /* Hover effect */
}


/* Divider styles - stays fixed at full width */
.divider {
  height: 2px;
  background-color: lightgrey;
  width: 80%; /* Divider always spans the full width */
  position: fixed; /* Ensures the divider stays in place */
  left: 10%; /* Center the divider */
  z-index: 10; /* Ensures it's above other content */
}

body {
  margin: 0; /* Remove body margin to avoid unwanted shifting */
}

footer {
  margin-top: 100px;
  text-align: center;
}
</style>