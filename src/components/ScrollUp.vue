<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 100 // Show if scrolled more than 100px
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

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
