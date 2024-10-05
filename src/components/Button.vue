<template>
  <!-- Use props.text for dynamic text, and accept button type, style, and classes dynamically -->
  <button :type="type" :class="['btn', customClass]" :style="customStyle" :disabled="disabled">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'AButton',
  props: {
    text: {
      type: String,
      default: 'Click me' // Default button text
    },
    type: {
      type: String,
      default: 'button' // Default button type (could be 'submit', 'reset', etc.)
    },
    customStyle: {
      type: Object,
      default: () => ({}) // Allow custom inline styles
    },
    customClass: {
      type: String,
      default: '' // Allow custom classes for styling
    },
    disabled: {
      type: Boolean,
      default: false // Allow button to be disabled
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 0.625rem 1.25rem; /* 10px = 0.625rem, 20px = 1.25rem */
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px; /* Keeping border-radius in px, as suggested */
  cursor: pointer;
  font-size: 1rem; /* 16px = 1rem */
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #45a049;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
