<script lang="ts">
import TheContainer from '@/components/TheContainer.vue'
import ChatArea from '@/components/ChatArea.vue'
import ChatInput from '@/components/ChatInput.vue'
import { chatStore } from './stores/chatStore'
import FileInput from '@/components/fileInput.vue'

export default {
  components: {
    TheContainer,
    ChatArea,
    ChatInput,
    FileInput
  },
  computed: {
    chatStore() {
      return chatStore()
    },
    messages() {
      return this.chatStore.messages
    },
    isAnalysisComplete() {
      return this.chatStore.isAnalysisComplete
    },
    loading() {
      return this.chatStore.loading
    }
  },
  methods: {
    async sendMessage(text: string) {
      await this.chatStore.sendMessage(text)
    },
    resetChat() {
      this.chatStore.resetChat()
    },
    async handleFileUpload(files: Array<{ name: string; type: string; preview?: string }>) {
      files.forEach((file) => {
        this.chatStore.messages.push({
          sender: 'user',
          text: `Uploaded file: ${file.name}`,
          data: file
        })
      })
    }
  }
}
</script>

<template>
  <TheContainer>
    <div class="columns is-gapless is-mobile">
      <aside class="column is-2 sidebar">
        <section class="section p-4">
          <h2 class="title is-5">Chat Options</h2>
          <ul class="menu-list">
            <RouterLink to="/chat" class="is-active" @click="resetChat">New Analysis</RouterLink>
            <li><a href="#">Saved Analyses</a></li>
            <li><a href="#">Chat Bot</a></li>
          </ul>
        </section>
      </aside>

      <div class="column is-9 chat-container">
        <section class="section py-5">
          <p class="has-text-centered">
            Welcome to the analysis chat! Provide your prompt below to start threat mapping.
          </p>
        </section>

        <ChatArea :messages="messages" />

        <section v-if="!isAnalysisComplete" class="section">
          <div class="section is-flex is-justify-content-center is-align-items-center">
            <FileInput @upload="handleFileUpload" />
            <ChatInput @send="sendMessage" />
          </div>
        </section>

        <section v-else class="section">
          <p class="has-text-centered mb-4">
            The analysis is complete. Please press the button to start a new one.
          </p>
          <button class="button is-primary" @click="resetChat">Start New Analysis</button>
        </section>
      </div>
    </div>
  </TheContainer>
</template>

<style scoped>
.sidebar {
  border-right: 1px solid #7c7777;
  padding: 0.75rem;
}
</style>
