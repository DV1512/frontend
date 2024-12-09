<script lang="ts">
import { userStore } from './stores/userStore'
import { mapState, mapActions } from 'pinia'
import TheContainer from '@/components/TheContainer.vue'
import { useThemeStore } from './stores/themeStore'

export default {
  components: {
    TheContainer
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      isLoading: false,
      deleteError: '',
      statusMessage: '',
      showPopup: false,
      showDeletePopup: false,
      showUpdatePopup: false
    }
  },
  computed: {
    isLoggedIn() {
      const store = userStore()
      return store.isLoggedIn
    },
    ...mapState(userStore, ['user', 'loading']),
    userInfo: {
      get() {
        return {
          username: this.user?.username || '',
          email: this.user?.email || '',
          firstName: this.user?.first_name || '',
          lastName: this.user?.last_name || ''
        }
      },
      set(updatedUserInfo: {
        username: string
        email: string
        firstName: string
        lastName: string
      }) {
        this.userInfo = updatedUserInfo
      }
    },
    isFormValid() {
      return (
        this.userInfo.username &&
        this.userInfo.email &&
        this.userInfo.firstName &&
        this.userInfo.lastName &&
        (!this.password || this.password === this.confirmPassword)
      )
    }
  },
  methods: {
    ...mapActions(userStore, ['delete', 'updateUser']),

    useThemeStore() {
      return useThemeStore()
    },

    handleProfileUpdateClick() {
      this.showUpdatePopup = true
    },

    async confirmUpdate() {
      this.showUpdatePopup = false
      this.isLoading = true
      this.statusMessage = ''
      try {
        await this.updateUser(
          this.userInfo.username,
          this.userInfo.email,
          this.userInfo.firstName,
          this.userInfo.lastName,
          this.password
        )
        console.log('Profile updated successfully with new data:', this.userInfo)
        this.showPopupWithMessage('Profile updated successfully!')
      } catch (error) {
        console.error('Error updating profile:', error)
        this.showPopupWithMessage('Error updating profile. Please try again later.')
      } finally {
        this.isLoading = false
      }
    },

    cancelUpdate() {
      this.showUpdatePopup = false
    },

    async confirmDelete() {
      this.showDeletePopup = false

      try {
        await this.delete()
        console.log('Account deleted successfully')
        this.showPopupWithMessage('Account deleted successfully!')

        await new Promise((resolve) => setTimeout(resolve, 1000))

        this.$router.push({ name: 'start' })
      } catch (error) {
        console.error('Error deleting account:', error)
        this.showPopupWithMessage('Error deleting account. Please try again later.')
      }
    },

    cancelDelete() {
      this.showDeletePopup = false
    },

    handleDelete() {
      this.showDeletePopup = true
    },

    showPopupWithMessage(message: string) {
      this.statusMessage = message
      this.showPopup = true
      setTimeout(() => {
        this.showPopup = false
        this.statusMessage = ''
      }, 3000)
    }
  }
}
</script>

<template>
  <div class="app-container">
    <TheContainer>
      <template #heading>{{ userInfo.firstName + ' ' + userInfo.lastName }}</template>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input
              type="text"
              v-model="userInfo.firstName"
              class="input"
              placeholder="First Name"
              required
            />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input
              type="text"
              v-model="userInfo.lastName"
              class="input"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              type="email"
              v-model="userInfo.email"
              class="input"
              placeholder="Email"
              required
            />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input
              type="text"
              v-model="userInfo.username"
              class="input"
              placeholder="Username"
              required
            />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              type="password"
              v-model="password"
              class="input"
              placeholder="Password"
              minlength="8"
            />
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control">
            <input
              type="password"
              v-model="confirmPassword"
              class="input"
              placeholder="Confirm Password"
              minlength="8"
            />
            <p v-if="password !== confirmPassword" class="help is-danger">
              Passwords do not match.
            </p>
          </div>
        </div>
      </div>

      <div class="columns is-centered mt-5">
        <div class="column is-narrow">
          <button
            type="submit"
            class="button is-primary custom-button"
            :disabled="!isFormValid || isLoading"
            @click="handleProfileUpdateClick"
          >
            Update Profile
          </button>
        </div>
      </div>
      <div v-if="showUpdatePopup" class="modal-overlay">
        <section class="section">
          <section class="box">
            <p>Confirm Update</p>
            <p>Are you sure you want to update your profile?</p>
            <div class="modal-actions">
              <button @click="confirmUpdate" class="button is-primary custom-button">
                Yes, Update
              </button>
              <button @click="cancelUpdate" class="button custom-button">Cancel</button>
            </div>
          </section>
        </section>
      </div>

      <div class="columns is-centered mt-5">
        <div class="column is-narrow">
          <button @click="handleDelete" class="button is-primary custom-button">
            Delete Account
          </button>
        </div>
        <div v-if="showDeletePopup" class="modal-overlay">
          <section class="section">
            <section class="box">
              <p>Confirm Delete</p>
              <p>Are you sure you want to delete your account?</p>
              <p>This action is irreversible.</p>
              <div class="modal-actions">
                <button @click="confirmDelete" class="button is-primary custom-button">
                  Yes, Delete
                </button>
                <button @click="cancelDelete" class="button custom-button">Cancel</button>
              </div>
            </section>
          </section>
        </div>

        <div class="column is-narrow">
          <button @click="useThemeStore().toggleTheme" class="button is-primary custom-button">
            <span>{{ useThemeStore().isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>
        </div>
      </div>
    </TheContainer>

    <div v-if="showPopup" class="popup">
      <p>{{ statusMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.65rem 2rem;
  background-color: #35578d;
  color: white;
  border-radius: 10px;
  text-align: center;
  animation: fadeOut 2s forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.custom-button {
  width: 250px;
  margin: 0 80px;
  margin-top: 1rem;
}

.field {
  width: 70%;
  margin-top: 1.5rem;
}

.mt-5 {
  margin-top: 2rem;
}
</style>
