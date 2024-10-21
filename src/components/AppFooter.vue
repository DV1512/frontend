<script setup>
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <div class="columns is-centered is-vcentered">
        <!-- Logo Column -->
        <div class="column is-narrow">
          <RouterLink to="/">
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
          </RouterLink>
        </div>
        <!-- Links Columns with Icons -->
        <div class="column is-narrow">
          <RouterLink to="/tos" class="footer-link">
            <Icon icon="mdi:file-document" class="icon-size" />
            Terms
          </RouterLink>
        </div>
        <div class="column is-narrow">
          <RouterLink to="/privacy" class="footer-link">
            <Icon icon="mdi:shield-lock" class="icon-size" />
            Privacy
          </RouterLink>
        </div>
        <!-- Optional Security Link -->
        <div class="column is-narrow">
          <RouterLink to="/security" class="footer-link">
            <Icon icon="mdi:lock" class="icon-size" />
            Security
          </RouterLink>
        </div>
        <div class="column is-narrow">
          <RouterLink to="/docs" class="footer-link">
            <Icon icon="mdi:book" class="icon-size" />
            Docs
          </RouterLink>
        </div>
        <div class="column is-narrow">
          <RouterLink to="/contact" class="footer-link">
            <Icon icon="mdi:email" class="icon-size" />
            Contact
          </RouterLink>
        </div>
      </div>

      <!-- Copyright -->
      <div class="copyright">© 2024 ThreatMapper, Inc.</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 1.5rem 0;
  font-size: 0.875rem; /* Small font size */
}

.icon-size {
  margin-right: 0.5rem;
  font-size: 1rem; /* Icon size */
}

.logo {
  width: 40px; /* Size of the logo */
  height: auto;
  margin-right: 10px; /* Space between logo and navigation */
  border-radius: 100px; /* Rounded corners */
}

.copyright {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #888; /* Light gray text for copyright */
}
</style>
