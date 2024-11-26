import { defineStore } from 'pinia'
import chatService from '../services/chatService'

export const chatStore = defineStore('chatStore', {
  state: () => ({
    messages: [] as Array<{
      sender: string
      text: string
      data?: any
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

      this.messages.push({ sender: 'user', text: prompt })
      this.loading = true

      try {
        chatService.setPrompt(prompt)

        const response = await chatService.sendMessage()
        console.log('Received response from API:', response)

        const botMessage = {
          sender: 'bot',
          text: `Analysis complete! Here are the details: \n\nID: ${response.id} \nName: ${response.name} \nDescription: ${response.description} \nAssociated Names: ${response.associated_names} \nURL: ${response.url}`,
          data: {
            id: response.id,
            name: response.name,
            description: response.description,
            associated_names: response.associated_names,
            url: response.url
          }
        }

        this.messages.push(botMessage)
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
    }
  }
})
