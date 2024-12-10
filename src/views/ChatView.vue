<script lang="ts">
import TheContainer from '@/components/TheContainer.vue'
import ChatArea from '@/components/ChatArea.vue'
import fileInput from '@/components/fileInput.vue'
import { chatStore } from './stores/chatStore'
import ChatInput from '@/components/ChatInput.vue'

export default {
  components: {
    TheContainer,
    ChatArea,
    fileInput,
    ChatInput
  },
  data() {
    return {
      message: '',
      uploadedFiles: [] as Array<{ name: string; type: string }>
    }
  },
  computed: {
    chatStore() {
      return chatStore()
    },
    messages() {
      return this.chatStore.messages
    },
    fileNames() {
      return this.uploadedFiles.map((file) => file.name).join(', ')
    }
  },
  methods: {
    async sendMessage() {
      if (!this.message.trim() && !this.uploadedFiles.length) {
        return
      }

      const fileText = this.uploadedFiles.length ? `Uploaded file(s): ${this.fileNames}` : ''

      const fullMessage = [this.message.trim(), fileText].filter(Boolean).join('\n')

      this.chatStore.messages.push({
        sender: 'user',
        text: fullMessage,
        data: this.uploadedFiles.length ? { files: this.uploadedFiles } : null
      })

      await this.chatStore.sendMessage(fullMessage, this.uploadedFiles)

      this.message = ''
      this.uploadedFiles = []
    },
    handleFileUpload(files: Array<{ name: string; type: string }>) {
      this.uploadedFiles.push(...files)
    },
    resetChat() {
      this.chatStore.resetChat()
      this.message = ''
      this.uploadedFiles = []
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

        <section class="section">
          <div class="field is-grouped">
            <fileInput @upload="handleFileUpload" />
            <input
              v-model="message"
              type="text"
              placeholder="Type your message or attach files..."
              class="input"
            />
            <button @click="sendMessage" class="button is-primary">
              <Icon icon="mdi:send" class="icon-size" />
            </button>
          </div>

          <div v-if="uploadedFiles.length" class="uploaded-files mt-2">
            <div v-for="(file, index) in uploadedFiles" :key="index" class="uploaded-file">
              <span>{{ file.name }} ({{ file.type }})</span>
            </div>
          </div>
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
