declare global {
  interface Message {
    text: string
    sender: 'user' | 'bot'
  }
}

export {}
