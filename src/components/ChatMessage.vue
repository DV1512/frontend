<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    messageClass() {
      return {
        message: true,
        user: this.message.sender === 'user',
        bot: this.message.sender === 'bot'
      }
    }
  }
}
</script>

<template>
  <div :class="messageClass">
    <div class="message-content" v-html="message.text"></div>
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
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
