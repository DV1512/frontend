<script setup>
import { ref, defineEmits } from 'vue'
import { Icon } from '@iconify/vue'

const message = ref('')
const emit = defineEmits(['send'])
</script>

<template>
  <div class="field is-grouped">
    <div class="input-area">
      <input
        v-model="message"
        @keyup.enter="message.trim() && emit('send', message)"
        type="text"
        placeholder="Type your message..."
        class="input"
      />
    </div>
    <div class="control">
      <button @click="message.trim() && emit('send', message)" class="button is-primary">
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
