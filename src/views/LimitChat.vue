<script lang="ts">
import TheContainer from '@/components/TheContainer.vue'
import ChatArea from '@/components/ChatArea.vue'
import ChatInput from '@/components/ChatInput.vue'
import { threatDatabase } from '@/constants/threats'

export default {
  components: {
    TheContainer,
    ChatArea,
    ChatInput
  },
  data() {
    return {
      messages: [] as Array<{ sender: string; text: string }>,
      interactionCount: 0,
      maxInteractions: 5,
      isLimitReached: false,
      threatLogs: [] as Array<string>,
      threatDatabase
    }
  },
  methods: {
    handleMessage(userMessage: string) {
      if (this.interactionCount >= this.maxInteractions) {
        this.isLimitReached = true
        return
      }

      this.messages.push({ sender: 'user', text: userMessage })

      const threatAnalysis = this.analyzeThreat(userMessage)
      if (threatAnalysis) {
        this.threatLogs.push(threatAnalysis)
      }

      const botResponse = this.getBotResponse(userMessage, threatAnalysis)
      this.simulateTyping(botResponse)

      this.interactionCount++
    },

    getBotResponse(message: string, threatAnalysis: string | null): string {
      if (threatAnalysis) {
        return `I've detected a potential concern: ${threatAnalysis}Do you need help with anything else?`
      }
      if (message.toLowerCase().includes('asset')) {
        return 'What kind of assets are you protecting?'
      } else if (message.toLowerCase().includes('threat')) {
        return 'Who are the potential adversaries?'
      }
      return 'Can you clarify your question?'
    },

    simulateTyping(response: string) {
      const letters = response.split('')
      let currentMessage = ''
      const interval = 50

      letters.forEach((letter, index) => {
        setTimeout(() => {
          currentMessage += letter
          if (index === 0) {
            this.messages.push({ sender: 'bot', text: currentMessage })
          } else {
            this.messages[this.messages.length - 1].text = currentMessage
          }
        }, index * interval)
      })
    },

    analyzeThreat(message: string): string | null {
      const detectedThreats = this.threatDatabase.filter((threat) =>
        message.toLowerCase().includes(threat.title.toLowerCase())
      )

      if (detectedThreats.length > 0) {
        let logMessage = '\n<strong>Threats detected:</strong>'
        detectedThreats.forEach((threat) => {
          logMessage += ` ${threat.id} 
          \n<strong>${threat.title}:</strong> ${threat.description}
          \n<strong>Mitigation Strategies:</strong> ${threat.mitigation.join(', ')}\n`
          if (threat.referenceURL) {
            logMessage += `\n<strong/>Learn more:</strong><a href="${threat.referenceURL}" target="_blank" rel="noopener noreferrer">${threat.referenceURL}</a>\n\n`
          }
        })

        this.threatLogs.push(logMessage)
        return logMessage
      }

      return null
    },

    resetSession() {
      this.isLimitReached = false
      this.messages = []
      this.interactionCount = 0
      this.threatLogs = []
    }
  }
}
</script>

<template>
  <div class="app-container">
    <TheContainer>
      <template #heading> Limited Chat </template>

      <section class="section is-flex is-justify-content-center">
        <p>
          Hi and welcome to the Limited Chat!<br />
          Here you can chat with a bot, but only for a limited number of interactions.<br />
          Threat modeling is active to flag potential concerns.
        </p>
      </section>

      <ChatArea :messages="messages" />

      <section class="section is-flex is-justify-content-center is-align-items-center">
        <div v-if="!isLimitReached" class="is-flex is-align-items-center">
          <ChatInput @send="handleMessage" />
        </div>

        <!-- Reset button appears when the limit is reached -->
        <button v-else @click="resetSession" class="button is-danger is-light is-rounded">
          Reset Session
        </button>
      </section>
    </TheContainer>
  </div>
</template>

<style>
p {
  text-align: center;
}
</style>
