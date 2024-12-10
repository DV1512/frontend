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
    loading: false,
    uploadedFiles: [] as Array<{ name: string; type: string }>
  }),

  actions: {
    async sendMessage(prompt: string, uploadedFiles: { name: string; type: string }[]) {
      if (this.isAnalysisComplete) {
        console.warn('Analysis is already complete. Reset to start a new one.')
        return
      }
      const userMessage = {
        sender: 'user',
        text: prompt,
        data: uploadedFiles.length ? { files: uploadedFiles } : null
      }
      this.messages.push(userMessage)
      this.loading = true
      try {
        chatService.setPrompt(prompt)
        if (uploadedFiles.length) {
          chatService.setFiles(uploadedFiles)
        }
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
      this.uploadedFiles = []
      console.log('Chat reset successfully.')
    },
    addUploadedFiles(files: Array<{ name: string; type: string }>) {
      this.uploadedFiles.push(...files)
      this.messages.push(
        ...files.map((file) => ({
          sender: 'user',
          text: `Uploaded file: ${file.name}`,
          data: file
        }))
      )
      console.log('Files uploaded:', files)
    }
  }
})
