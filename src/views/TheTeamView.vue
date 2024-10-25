<script setup lang="ts">
import TheContainer from '@/components/TheContainer.vue'
</script>

<template>
  <div class="content">
    <TheContainer>
      <h1 class="title has-text-centered">The Team</h1>
      <h1>Meet the team:</h1>
      <p>
        We are a dedicated team of developers focused on building a chatbot application that detects
        and prevents security threats in texts and images. Our mission is to create a robust
        platform capable of analyzing data, whether in the form of text or images, and identifying
        harmful content or malicious code. By leveraging the power of a Local Language Model (LLM)
        and modern web technologies, we aim to enhance security and prevent potential threats in
        real-time.
      </p>
      <h2>Our Team:</h2>
      <ul>
        <li>
          <h6>Backend Developers:</h6>
          <ol>
            <li>Gustav</li>
            <li>Oskar</li>
            <li>Emil</li>
          </ol>
          The backend team is responsible for the core functionality of our application, integrating
          the LLM, and managing authentication systems to ensure secure access control.
        </li>
        <li>
          <h6>Frontend Developers:</h6>
          <ol>
            <li>Emma</li>
            <li>Muaath</li>
          </ol>
          The frontend team focuses on designing and developing an intuitive web interface that
          allows users to interact with the application, providing input through prompts and
          receiving output seamlessly.
        </li>
        <li>
          <h6>Our Values as a team, we prioritize:</h6>
          <ol>
            <li>Respect and Professionalism</li>
            <li>Open Communication</li>
            <li>Collaboration and Teamwork</li>
            <li>Accountability and Commitment</li>
            <li>Conflict Resolution</li>
            <li>Flexibility and Adaptability</li>
          </ol>
        </li>
      </ul>
    </TheContainer>
  </div>
</template>
