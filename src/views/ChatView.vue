<script setup lang="ts">
import TheContainer from '@/components/TheContainer.vue' // Do we want to import the TheContainer component?
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const messages = ref([{ text: 'Hello! How can I assist you today?', sender: 'bot' }])

const newMessage = ref('')

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    messages.value.push({ text: newMessage.value, sender: 'user' })
    newMessage.value = ''
    setTimeout(() => {
      messages.value.push({ text: 'I am here to help!', sender: 'bot' }) // Here we can change the response to see how it works
    }, 1000)
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

        <div class="chat-area">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message', message.sender]"
          >
            <div class="message-content">{{ message.text }}</div>
          </div>
        </div>

        <section class="section is-flex is-justify-content-center is-align-items-center">
          <div class="field is-grouped">
            <div class="input-area">
              <input
                v-model="newMessage"
                @keyup.enter="sendMessage"
                type="text"
                placeholder="Type your message..."
                class="input"
              />
            </div>
            <div class="control">
              <button @click="sendMessage" class="button is-primary">
                <Icon icon="mdi:send" class="icon-size" />
              </button>
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

.menu-list {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.75rem;
  color: #4a4a4a;
  border-radius: 5px;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-area {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  height: 70vh;
}

.message {
  margin-bottom: 1rem;
  display: flex;
}

.message.user .message-content {
  background-color: #3273dc;
  color: white;
  align-self: flex-end;
}

.message.bot .message-content {
  background-color: #e0e0e0;
  color: black;
  align-self: flex-start;
}

.message-content {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  max-width: 60%;
}

.icon-size {
  font-size: 1.5rem;
}
</style>
