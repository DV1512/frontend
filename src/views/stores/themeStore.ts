import { defineStore } from 'pinia'

export const useThemeStore = defineStore('themeStore', {
  state: () => ({
    theme: 'auto'
  }),

  getters: {
    currentTheme: (state) => state.theme
  },

  actions: {
    toggleTheme() {
      if (this.theme === 'auto') {
        this.theme = 'dark'
      } else if (this.theme === 'dark') {
        this.theme = 'light'
      } else {
        this.theme = 'auto'
      }

      this.applyTheme()
    },

    initializeTheme() {
      const savedTheme = localStorage.getItem('theme')
      this.theme = savedTheme || 'auto'

      this.applyTheme()
    },

    detectSystemTheme() {
      if (this.theme === 'auto') {
        const prefersAuto = window.matchMedia('(prefers-color-scheme: auto)').matches

        document.documentElement.classList.remove('is-dark', 'is-light')
        document.documentElement.setAttribute('data-theme', 'auto')

        if (prefersAuto) {
          console.log('System prefers dark mode.')
          document.documentElement.classList.add('is-dark')
        } else {
          console.log('System prefers light mode.')
          document.documentElement.classList.add('is-light')
        }
      }
    },

    applyTheme(forcedTheme = null) {
      const themeToApply = forcedTheme || this.theme

      document.documentElement.setAttribute('data-theme', themeToApply)

      document.documentElement.classList.remove('is-dark', 'is-light')
      if (themeToApply === 'dark') {
        document.documentElement.classList.add('is-dark')
      } else if (themeToApply === 'light') {
        document.documentElement.classList.add('is-light')
      }

      if (!forcedTheme) {
        localStorage.setItem('theme', this.theme)
      }
    }
  }
})
