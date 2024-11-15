<script>
import { Icon } from '@iconify/vue'

export default {
  components: {
    Icon
  },
  props: {
    provider: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true,
      validator: (value) => ['login', 'signup'].includes(value)
    }
  },
  computed: {
    icon() {
      return this.provider === 'google'
        ? 'logos:google-icon'
        : this.provider === 'github'
          ? 'mdi:github'
          : ''
    },
    buttonText() {
      return `${this.capitalize(this.action)} with ${this.capitalize(this.provider)}`
    }
  },
  methods: {
    handleClick() {
      const method = `handle${this.capitalize(this.provider)}${this.capitalize(this.action)}Click`
      this.$emit('click', method)
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
  }
}
</script>

<template>
  <div class="column is-narrow">
    <button class="button is-primary custom-button is-flex" @click="handleClick">
      <span class="button-content">
        <Icon :icon="icon" class="icon" />
        <span>{{ buttonText }}</span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.custom-button {
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  margin-right: 10px;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
