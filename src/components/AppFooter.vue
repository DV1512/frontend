<script setup>
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <div class="columns is-centered is-vcentered">
        <div class="column is-narrow">
          <RouterLink to="/">
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
          </RouterLink>
        </div>

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

      <div class="copyright">© 2024 ThreatMapper, Inc.</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 1.5rem 0;
  font-size: 0.875rem;
}

.icon-size {
  margin-right: 0.5rem;
  font-size: 1rem;
}

.logo {
  width: 40px;
  height: auto;
  margin-right: 10px;
  border-radius: 100px;
}

.copyright {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #888;
}
</style>
