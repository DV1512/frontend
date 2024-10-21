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
  <div v-if="showBackToTop" class="scroll-up-button" @click="scrollToTop">
    <Icon icon="mdi:arrow-up" class="icon" />
  </div>
</template>

<style scoped>
.scroll-up-button {
  position: fixed;
  bottom: 4rem;
  right: 2rem;
  background-color: #333;
  padding: 0.75rem 1rem; /* Adjust padding for visibility */
  border-radius: 50px;
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.scroll-up-button:hover {
  background-color: #444;
}

.icon {
  font-size: 1.5rem;
}
</style>
