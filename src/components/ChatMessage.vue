<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  message: Object
})
</script>

<template>
  <div :class="['message', message.sender]">
    <div class="message-content">{{ message.text }}</div>
  </div>
</template>

<style scoped>
.message {
  margin-bottom: 1rem;
  display: flex;
}

.message.user .message-content {
  background-color: #3273dc;
  color: white;
  align-self: flex-end;
}

.message.bot .message-content {
  background-color: #e0e0e0;
  color: black;
  align-self: flex-start;
}

.message-content {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  max-width: 60%;
}
</style>
