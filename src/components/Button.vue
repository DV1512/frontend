<template>
    <!-- Use props.text to display dynamic button text -->
    <button @click="handleClick" class="btn">{{ text }}</button>
  </template>
  

  <script>
  export default {
    name: 'AButton',
    props: {
      text: {
        type: String,
        default: 'Click me'
      },
      customStyle: {
        type: Object,
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleClick() {
        // Emit a 'click' event with custom payload if needed
        this.$emit('click');
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
} 

</style>