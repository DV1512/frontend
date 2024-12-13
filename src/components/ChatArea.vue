<script>
import ChatMessage from './ChatMessage.vue'

export default {
  components: {
    ChatMessage
  },
  props: {
    messages: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="chat-area">
    <ChatMessage v-for="(message, index) in messages" :key="index" :message="message" />
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
