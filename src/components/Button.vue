<template>
  <button :class="['button', customClass]" :style="customStyle" @click="handleClick">
    <slot name="icon"></slot>
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click'])

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button span {
  margin-left: 10px;
}
</style>
