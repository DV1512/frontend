<script lang="ts">
import TheContainer from '@/components/TheContainer.vue'
import ChatArea from '@/components/ChatArea.vue'
import ChatInput from '@/components/ChatInput.vue'
import { chatStore } from './stores/chatStore'

export default {
  components: {
    TheContainer,
    ChatArea,
    ChatInput
  },
  data() {
    return {
      uploadedFiles: [] as Array<{ name: string; type: string; preview?: string }>
    }
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
    async handleFileUpload(event: Event) {
      const input = event.target as HTMLInputElement
      if (input && input.files) {
        const files = Array.from(input.files)
        files.forEach((file) => {
          if (file.type === 'application/json') {
            this.handleJsonFile(file)
          } else if (file.type === 'application/pdf') {
            this.handlePdfFile(file)
          } else if (
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ) {
            this.handleDocxFile(file)
          } else if (file.type.startsWith('image/')) {
            this.handleImageFile(file)
          } else {
            this.handleOtherFile(file)
          }
        })
      }
    },

    handleJsonFile(file: File) {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result as string)
          console.log('Parsed JSON:', jsonData)
        } catch (e) {
          console.error('Error parsing JSON', e)
        }
      }
      reader.readAsText(file)
    },

    handlePdfFile(file: File) {
      console.log('PDF file uploaded:', file.name)
    },

    handleDocxFile(file: File) {
      console.log('DOCX file uploaded:', file.name)
    },

    handleImageFile(file: File) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result as string
        this.uploadedFiles.push({
          name: file.name,
          type: file.type,
          preview: imageUrl
        })
      }
      reader.readAsDataURL(file)
    },

    handleOtherFile(file: File) {
      console.log('Uploaded file:', file.name)
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

        <section
          v-if="!isAnalysisComplete"
          class="section is-flex is-justify-content-center is-align-items-center"
        >
          <ChatInput @send="sendMessage" />
        </section>

        <section v-else class="section is-flex is-justify-content-center is-align-items-center">
          <p class="has-text-centered mb-4">
            The analysis is complete. Please press the button to start a new one.
          </p>
          <button class="button is-primary" @click="resetChat">Start New Analysis</button>
        </section>

        <section class="section">
          <h3 class="title is-5">Upload Files</h3>
          <input type="file" @change="handleFileUpload" multiple />
        </section>

        <section v-if="uploadedFiles.length > 0">
          <h4 class="title is-6">Uploaded Files</h4>
          <ul>
            <li v-for="file in uploadedFiles" :key="file.name">
              <span>{{ file.name }}</span>
              <div v-if="file.type.startsWith('image/')">
                <img :src="file.preview" alt="Image Preview" class="image-preview" />
              </div>
            </li>
          </ul>
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
