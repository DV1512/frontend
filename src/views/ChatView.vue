<script setup lang="ts">
import TheContainer from '@/components/TheContainer.vue'
import ChatArea from '@/components/ChatArea.vue'
import ChatInput from '@/components/ChatInput.vue'
import { ref } from 'vue'

const messages = ref([{ text: 'Hello! How can I assist you today?', sender: 'bot' }])

const sendMessage = (text: string) => {
  messages.value.push({ text, sender: 'user' })
  setTimeout(() => {
    messages.value.push({ text: 'I am here to help!', sender: 'bot' })
  }, 1000)
}
</script>

<template>
  <TheContainer>
    <div class="columns is-gapless is-mobile">
      <aside class="column is-2 sidebar">
        <section class="section p-4">
          <h2 class="title is-5">Chat Options</h2>
          <ul class="menu-list">
            <li><a href="#" class="is-active">New Chat</a></li>
            <li><a href="#">One Shot Answer</a></li>
            <li><a href="#">Previous Chats</a></li>
          </ul>
        </section>
      </aside>

      <div class="column is-9 chat-container">
        <section class="section py-5">
          <p class="has-text-centered">
            Welcome to the chat! Please provide your prompt to get started.
          </p>
        </section>

        <ChatArea :messages="messages" />

        <section class="section is-flex is-justify-content-center is-align-items-center">
          <ChatInput @send="sendMessage" />
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

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
