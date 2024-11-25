import { defineStore } from 'pinia'
import chatService from '../services/chatService'
import authService from '../services/authService'

export const useChatStore = defineStore('chatStore', {
  state: () => ({
    messages: [] as Array<{
      sender: string
      text: string
    }>,
    isAnalysisComplete: false,
    loading: false
  }),

  actions: {
    async sendMessage(prompt: string) {
      if (this.isAnalysisComplete) {
        console.warn('Analysis is already complete. Reset to start a new one.')
        return
      }

      // Validate prompt
      if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
        console.error('Invalid prompt: Ensure it is a non-empty string.')
        this.messages.push({
          sender: 'bot',
          text: 'Invalid prompt. Please provide a valid input.'
        })
        return
      }

      this.messages.push({ sender: 'user', text: prompt })
      this.loading = true

      try {
        const token = authService.getAccessToken()
        if (!token) {
          throw new Error('User is not authenticated.')
        }

        chatService.setPrompt(prompt)

        const response = await chatService.sendMessage()
        this.messages.push({ sender: 'bot', text: response })
        this.isAnalysisComplete = true
      } catch (error) {
        this.messages.push({
          sender: 'bot',
          text: 'Failed to get a response. Please try again later.'
        })
        console.error('Error sending message:', error)
      } finally {
        this.loading = false
      }
    },

    resetChat() {
      this.messages = []
      this.isAnalysisComplete = false
      // TODO: Add reset method in chatService if needed and if we want
    }
  }
})
