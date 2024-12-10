class ChatService {
  private prompt: string = ''
  private files: Array<{ name: string; type: string }> = []
  setPrompt(text: string) {
    if (!text || typeof text !== 'string' || text.trim() === '') {
      console.error('Invalid prompt: Ensure it is a non-empty string.')
      throw new Error('Invalid prompt')
    }
    this.prompt = text.trim()
    console.log('Prompt set successfully:', this.prompt)
  }
  setFiles(files: Array<{ name: string; type: string }>) {
    if (!Array.isArray(files)) {
      console.error('Invalid files: Ensure it is an array of file objects.')
      throw new Error('Invalid files')
    }
    this.files = files
    console.log('Files set successfully:', this.files)
  }
  async sendMessage() {
    const payload = { text: this.prompt, files: this.files.length ? this.files : undefined }

    try {
      const response = await fetch('http://localhost:8000/chat/structured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`LLM API error (${response.status}):`, errorText)
        throw new Error(`LLM API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error while communicating with LLM API:', error)
      throw error
    }
  }
}

export default new ChatService()
