<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <h3>
          <slot name="heading"></slot>
        </h3>
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
h3 {
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
  text-align: center;
}
</style>
