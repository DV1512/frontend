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
      <RouterLink to="/profile">
        <Icon icon="mdi:account" />
      </RouterLink>
      <RouterLink to="/settings">
        <Icon icon="mdi:cog" />
      </RouterLink>
      <RouterLink to="/logout">
        <Icon icon="mdi:logout" />
      </RouterLink>
    </nav>
  </header>

  <!-- Fixed grey/light-dark line -->
  <div class="divider"></div>

  <main class="section main-container">
    <RouterView />
  </main>

  <footer>
    <p>Terms of service, contact, other links?</p>
  </footer>
</template>

<style scoped>
/* Full-width navbar */
.navbar {
  padding: 0.5rem 1rem;
  width: 100%; /* Full width */
  box-sizing: border-box;
  display: flex;
  align-items: center; /* Align items vertically in the center */
}

/* Style for the logo in the top-left corner */
.logo {
  width: 70px; /* Size of the logo */
  height: auto;
  margin-right: 30px; /* Space between logo and navigation */
  border-radius: 10px; /* Rounded corners */
}

.menu {
  display: flex;
  gap: 2rem; /* Space between links */
  justify-content: flex-start; /* Align menu items to the start */
  padding-top: 50px; /* Move the text down by 15px */
}

/* Styling for the navigation links */
.menu a {
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
  width: 90%; /* Divider always spans the full width */
  position: fixed; /* Ensures the divider stays in place */
  left: 5%; /* Center the divider */
  margin: 0 auto; /* Center the divider */
}

/* Dynamic container */
.dynamic-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align items at the start of the container */
  padding: 2rem;
}

/* Footer styles */
footer {
  text-align: center;
  padding: 1rem 0;
}

/* Icons container */
.icons {
  display: flex;
  gap: 1rem;
  margin-left: auto; /* Push icons to the right */
  font-size: 2rem; /* Increase the size of the icons */
}

.icons a {
  color: inherit; /* Ensure the icon color is inherited */
  text-decoration: none; /* Remove underline from links */
}

.icons a:hover {
  color: darkgrey; /* Hover effect for icons */
}

.main-container {
  min-width: 100vw;
  min-height: 100vh;
}
</style>
