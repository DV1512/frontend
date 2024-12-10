<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const fileInput = ref(null)
const uploadedFiles = ref([])

const emit = defineEmits(['upload'])

const handleFileUpload = (event) => {
  const input = event.target
  if (input && input.files) {
    const files = Array.from(input.files)
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        handleImageFile(file)
      } else {
        uploadedFiles.value.push({
          name: file.name,
          type: file.type
        })
      }
    })
  }
}

const handleImageFile = (file) => {
  const reader = new FileReader()
  reader.onload = () => {
    uploadedFiles.value.push({
      name: file.name,
      type: file.type,
      preview: reader.result
    })
  }
  reader.readAsDataURL(file)
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

const sendFiles = () => {
  if (uploadedFiles.value.length) {
    emit('upload', uploadedFiles.value)
    uploadedFiles.value = []
  }
}
</script>

<template>
  <div class="field is-grouped">
    <div class="input-area">
      <input
        ref="fileInput"
        type="file"
        accept=".json,.pdf,.docx,.png,.jpg,.jpeg,.txt"
        @change="handleFileUpload"
        multiple
        class="is-hidden"
      />
    </div>
    <div class="control">
      <button @click="fileInput?.click()" class="button is-primary">
        <Icon icon="mdi:paperclip" class="icon-size" />
      </button>
    </div>

    <div v-if="uploadedFiles.length" class="uploaded-files">
      <div v-for="(file, index) in uploadedFiles" :key="index" class="uploaded-file">
        <span>{{ file.name }} ({{ file.type }})</span>
        <button class="button is-danger is-small" @click="removeFile(index)">Remove</button>
      </div>
      <button class="button is-primary is-small" @click="sendFiles">Upload</button>
    </div>
  </div>
</template>

<style scoped>
.icon-size {
  font-size: 1.35rem;
}
</style>
