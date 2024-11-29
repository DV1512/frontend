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
        return `I've detected a potential concern: ${threatAnalysis}. Do you need help with anything else?`
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
        let logMessage = 'Threats detected:\n'
        detectedThreats.forEach((threat) => {
          logMessage += `- **[${threat.id}] ${threat.title}**: ${
            threat.description
          }\n  Mitigation Strategies: ${threat.mitigation.join(', ')}\n`

          // Add reference URL if available
          if (threat.referenceURL) {
            logMessage += `  Learn more: [${threat.referenceURL}](${threat.referenceURL})\n\n`
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
    <!-- Container for the chat app -->
    <TheContainer>
      <template #heading> Limited Chat </template>

      <!-- Main chat area -->
      <section class="section is-flex is-justify-content-center">
        <p>
          Hi and welcome to the Limited Chat!<br />
          Here you can chat with a bot, but only for a limited number of interactions.<br />
          Threat modeling is active to flag potential concerns.
        </p>
      </section>

      <!-- Chat messages -->
      <ChatArea :messages="messages" />

      <!-- Input area -->
      <section class="section is-flex is-justify-content-center is-align-items-center">
        <ChatInput @send="handleMessage" />
      </section>

      <!-- Threat log -->
      <section class="section threat-log">
        <h3>Threat Analysis Logs</h3>
        <div v-if="threatLogs.length === 0">No threats detected yet.</div>
        <ul v-else>
          <li v-for="(log, index) in threatLogs" :key="index">
            <div v-html="log"></div>
          </li>
        </ul>
      </section>
    </TheContainer>
  </div>
</template>

<style>
/* Page-wide styles */
p {
  text-align: center;
}

/* Styles for the threat analysis logs */
.threat-log {
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.threat-log h3 {
  margin-bottom: 10px;
  color: #333;
}

.threat-log ul {
  list-style: none;
  padding: 0;
}

.threat-log li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.threat-log li:last-child {
  border-bottom: none;
}
</style>
