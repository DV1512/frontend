<script lang="ts">
import TheContainer from '@/components/TheContainer.vue'
import ChatArea from '@/components/ChatArea.vue'
import ChatInput from '@/components/ChatInput.vue'

export default {
  components: {
    TheContainer,
    ChatArea,
    ChatInput
  },
  data() {
    return {
      messages: [] as Array<{
        sender: string
        text: string
      }>,
      interactionCount: 0,
      maxInteractions: 5,
      isLimitReached: false,
      threatLogs: [] as Array<string>
    }
  },
  methods: {
    handleMessage(userMessage: string) {
      if (this.interactionCount >= this.maxInteractions) {
        this.isLimitReached = true
        return
      }

      // Add user's message
      this.messages.push({ sender: 'You', text: userMessage })

      // Analyze threat
      const threatAnalysis = this.analyzeThreat(userMessage)
      if (threatAnalysis) {
        this.threatLogs.push(threatAnalysis)
      }

      // Simulate bot typing and response
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
            this.messages.push({ sender: 'Bot', text: currentMessage })
          } else {
            this.messages[this.messages.length - 1].text = currentMessage
          }
        }, index * interval)
      })
    },
    analyzeThreat(message: string): string | null {
      const threats = [
        {
          keyword: 'breach',
          risk: 'Possible data breach (Critical risk).',
          threatActors: ['Hackers', 'Cybercriminals'],
          hackerGroups: ['Fancy Bear (Russia)', 'LulzSec (US)', 'REvil (Russia)']
        },
        {
          keyword: 'vulnerability',
          risk: 'Vulnerability in the system detected (High risk).',
          threatActors: ['Hackers', 'Insiders'],
          hackerGroups: ['APT28 (Russia)', 'Charming Kitten (Iran)']
        },
        {
          keyword: 'attack',
          risk: 'Potential attack vector identified (High risk).',
          threatActors: ['Hackers', 'Nation-state actors'],
          hackerGroups: ['Lazarus Group (North Korea)', 'Charming Kitten (Iran)']
        },
        {
          keyword: 'asset',
          risk: 'Sensitive asset mentioned (Medium risk).',
          threatActors: ['Insiders', 'Cybercriminals'],
          hackerGroups: ['Cobalt Group (Russia)', 'FIN7 (Ukraine)']
        },
        {
          keyword: 'exploit',
          risk: 'Exploit risk flagged (High risk).',
          threatActors: ['Hackers', 'Cybercriminals'],
          hackerGroups: ['Syndicate (Global)', 'LulzSec (US)']
        },
        {
          keyword: 'user authentication',
          risk: 'Weak authentication detected (Critical risk).',
          threatActors: ['Hackers', 'Insiders'],
          hackerGroups: ['APT34 (China)', 'Charming Kitten (Iran)']
        },
        {
          keyword: 'open ports',
          risk: 'Open ports detected (Medium risk).',
          threatActors: ['Hackers', 'Cybercriminals'],
          hackerGroups: ['Cobalt Group (Russia)', 'DarkSide (Russia)']
        },
        {
          keyword: 'data leak',
          risk: 'Data leak risk (Critical risk).',
          threatActors: ['Insiders', 'Hackers'],
          hackerGroups: ['Fancy Bear (Russia)', 'LulzSec (US)']
        },
        {
          keyword: 'denial of service',
          risk: 'Possible DDoS attack (High risk).',
          threatActors: ['Hackers', 'Cybercriminals'],
          hackerGroups: ['Anonymous (Global)', 'Armageddon (Iran)']
        },
        {
          keyword: 'cloud storage',
          risk: 'Risk of multi-tenant cloud vulnerabilities (Medium risk).',
          threatActors: ['Hackers', 'Nation-state actors'],
          hackerGroups: ['APT10 (China)', 'Lazarus Group (North Korea)']
        }
      ]

      for (const threat of threats) {
        if (message.toLowerCase().includes(threat.keyword)) {
          return `${threat.risk} Likely threat actors: ${threat.threatActors.join(', ')}. Possible hacker groups: ${threat.hackerGroups.join(', ')}.`
        }
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
      <template #heading>Limit Chat</template>

      <div class="columns is-centered">
        <section class="section p-5">
          <p>Hi and welcome to the Limited chat!</p>
          <p>Here you can chat with a bot, but only for a limited number of interactions.</p>
          <p>Threat modeling is active to flag potential concerns.</p>
        </section>
      </div>

      <!-- Chat Display Area -->
      <section class="chat-area section">
        <div v-for="(message, index) in messages" :key="index">
          <!-- User Message -->
          <div v-if="message.sender === 'You'" class="is-flex is-justify-content-end">
            <div class="message message-user">{{ message.text }}</div>
          </div>
          <!-- Bot Message -->
          <div v-else class="is-flex is-justify-content-start">
            <div class="message message-bot">{{ message.text }}</div>
          </div>
        </div>
      </section>

      <!-- Input Area -->
      <section class="section is-flex is-justify-content-center is-align-items-center">
        <ChatInput @send="handleMessage" />
      </section>

      <!-- Threat Logs -->
      <section class="section threat-log">
        <h3>Threat Analysis Logs</h3>
        <div v-if="threatLogs.length === 0">No threats detected yet.</div>
        <ul v-else>
          <li v-for="(log, index) in threatLogs" :key="index">
            {{ log }}
          </li>
        </ul>
      </section>
    </TheContainer>
  </div>
</template>

<style>
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
