<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

// State to track if "Back to Top" should be visible
const showBackToTop = ref(false)

// Function to handle scrolling
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 100 // Show if scrolled more than 100px
}

// Function to scroll back to the top smoothly
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Mount and unmount the scroll event listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Conditionally Render Back to Top -->
  <div v-if="showBackToTop" class="column is-narrow">
    <a href="javascript:void(0)" class="footer-link" @click="scrollToTop">
      <Icon icon="mdi:arrow-up" class="icon-size" />
      Back to Top
    </a>
  </div>
</template>
