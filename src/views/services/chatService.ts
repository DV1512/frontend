class ChatService {
  private prompt: string = ''

  setPrompt(text: string) {
    if (!text || typeof text !== 'string' || text.trim() === '') {
      console.error('Invalid prompt: Ensure it is a non-empty string.')
      throw new Error('Invalid prompt')
    }
    this.prompt = text.trim()
    console.log('Prompt set successfully:', this.prompt)
  }

  async sendMessage() {
    console.log('Raw prompt before payload construction:', this.prompt)

    if (!this.prompt) {
      console.error('No prompt has been set, cannot send message.')
      return
    }

    const payload = { text: this.prompt }
    console.log('Constructed payload to be sent:', payload)

    try {
      console.log('Sending request to API...')
      const response = await fetch('http://localhost:8000/chat/structured', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`LLM API error (${response.status}):`, errorText)
        throw new Error(`LLM API error: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Received response from API:', data)
      return data.response || 'Analysis complete!'
    } catch (error) {
      console.error('Error while communicating with LLM API:', error)
      if (error instanceof Error) {
        console.error('Detailed error message:', error.message)
      } else {
        console.error('Unknown error type:', error)
      }
      throw error
    }
  }
}

export default new ChatService()
