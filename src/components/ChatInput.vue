<script>
import { Icon } from '@iconify/vue'

export default {
  components: { Icon },
  emits: ['send'],
  data() {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage() {
      if (this.message.trim()) {
        this.$emit('send', this.message.trim())
        this.message = ''
      }
    }
  }
}
</script>

<template>
  <div class="field is-grouped">
    <div class="input-area">
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Type your message..."
        class="input"
        aria-label="Message input"
      />
    </div>
    <div class="control">
      <button @click="sendMessage" class="button is-primary" aria-label="Send message">
        <Icon icon="mdi:send" class="icon-size" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.icon-size {
  font-size: 1.35rem;
}
</style>
