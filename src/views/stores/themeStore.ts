import { defineStore } from 'pinia'
export const useThemeStore = defineStore('themeStore', {
  state: () => ({
    isDarkMode: false // default theme
  }),

  getters: {
    theme: (state) => (state.isDarkMode ? 'dark' : 'light')
  },

  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      document.documentElement.setAttribute('data-theme', this.theme)

      if (this.isDarkMode) {
        document.documentElement.classList.add('is-dark')
        document.documentElement.classList.remove('is-light')
      } else {
        document.documentElement.classList.add('is-light')
        document.documentElement.classList.remove('is-dark')
      }

      // Persist theme preference
      localStorage.setItem('theme', this.theme)
    },
    initializeTheme() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark'
      }

      // Apply the initial theme on page load
      document.documentElement.setAttribute('data-theme', this.theme)
      if (this.isDarkMode) {
        document.documentElement.classList.add('is-dark')
      } else {
        document.documentElement.classList.add('is-light')
      }
    }
  }
})
