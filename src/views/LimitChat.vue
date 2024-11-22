<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import TheContainer from '@/components/TheContainer.vue'
import ChatArea from '@/components/ChatArea.vue'
import ChatInput from '@/components/ChatInput.vue'

export default defineComponent({
  name: 'ChatApp',
  components: {
    RouterLink,
    TheContainer,
    ChatArea,
    ChatInput
  },
  data() {
    return {
      messages: [] as Array<{ sender: string; text: string }>,
      interactionCount: 0,
      maxInteractions: 5,
      isLimitReached: false
    }
  },
  methods: {
    handleMessage(userMessage: string) {
      // Check interaction limit
      if (this.interactionCount >= this.maxInteractions) {
        this.isLimitReached = true
        return
      }

      // Add user's message
      this.messages.push({ sender: 'You', text: userMessage })

      // Simulate bot response
      setTimeout(() => {
        const botResponse = this.getBotResponse(userMessage)
        this.messages.push({ sender: 'Bot', text: botResponse })
      }, 500)

      // Increment interaction count
      this.interactionCount++
    },
    getBotResponse(message: string): string {
      // Example bot responses
      if (message.toLowerCase().includes('asset')) {
        return 'What kind of assets are you protecting?'
      } else if (message.toLowerCase().includes('threat')) {
        return 'Who are the potential adversaries?'
      }
      return 'Can you clarify your question?'
    },
    resetSession() {
      this.isLimitReached = false
      this.messages = []
      this.interactionCount = 0
    }
  }
})
</script>
