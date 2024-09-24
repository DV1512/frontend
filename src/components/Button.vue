<template>
  <!-- Use props.text for dynamic text, and accept button type, style, and classes dynamically -->
  <button 
    :type="type" 
    @click="handleClick" 
    :class="['btn', customClass]" 
    :style="customStyle"
    :disabled="disabled"
  >
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
    },
    payload: {
      type: [Object, String, Number, Boolean, Array],
      default: null // Optional payload to emit with the click event
    }
  },
  methods: {
    handleClick() {
      // Emit a 'click' event with an optional payload
      this.$emit('click', this.payload);
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
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
