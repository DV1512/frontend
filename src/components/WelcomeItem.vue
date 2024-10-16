<template>
  <div class="item">
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%; /* Ensure it takes full width of the container */
}

.details {
  flex: 1;
  margin-left: 1rem;
  padding-top: 2rem; /* Adjust this value to move the text higher or lower */
}

h3 {
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
  text-align: center;
}
</style>
