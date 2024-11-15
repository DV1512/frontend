<script setup>
import { defineProps } from 'vue'
import ChatMessage from './ChatMessage.vue'

const props = defineProps({
  messages: Array
})
</script>

<template>
  <div class="chat-area">
    <ChatMessage v-for="(message, index) in props.messages" :key="index" :message="message" />
  </div>
</template>

<style scoped>
.chat-area {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  height: 50vh;
}
</style>
