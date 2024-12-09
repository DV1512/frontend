<script lang="ts">
import { userStore } from './stores/userStore'
import { mapActions } from 'pinia'
import TheContainer from '@/components/TheContainer.vue'
import { useThemeStore } from './stores/themeStore'

export default {
  components: {
    TheContainer
  },
  data() {
    const store = userStore()
    return {
      userInfo: {
        username: store.user?.username || '',
        email: store.user?.email || '',
        firstName: store.user?.first_name || '',
        lastName: store.user?.last_name || ''
      },
      password: '',
      confirmPassword: '',
      isLoading: false,
      deleteError: '',
      statusMessage: '',
      showPopup: false,
      showDeletePopup: false,
      showUpdatePopup: false,
      updateUserLoading: false,
      deleteLoading: false
    }
  },
  computed: {
    user() {
      return userStore().user
    },
    isLoggedIn() {
      return userStore().isLoggedIn
    },
    isFormModified() {
      return (
        this.userInfo.username !== this.user?.username ||
        this.userInfo.email !== this.user?.email ||
        this.userInfo.firstName !== this.user?.first_name ||
        this.userInfo.lastName !== this.user?.last_name ||
        this.password !== '' ||
        this.confirmPassword !== ''
      )
    },
    isUpdateButtonDisabled() {
      const isValid =
        this.userInfo.username &&
        this.userInfo.email &&
        this.userInfo.firstName &&
        this.userInfo.lastName
      return !(
        this.isFormModified &&
        isValid &&
        (this.password === this.confirmPassword || !this.password)
      )
    },
    originalUserInfo() {
      return {
        username: this.user?.username || '',
        email: this.user?.email || '',
        firstName: this.user?.first_name || '',
        lastName: this.user?.last_name || ''
      }
    }
  },
  methods: {
    ...mapActions(userStore, ['delete', 'updateUser']),

    useThemeStore() {
      return useThemeStore()
    },

    togglePopup(popupName: 'showPopup' | 'showDeletePopup' | 'showUpdatePopup') {
      this[popupName] = !this[popupName]
    },

    async confirmAction(actionName: 'Delete' | 'Update', args: any[] = []) {
      if (actionName === 'Update') {
        this.updateUserLoading = true
      } else if (actionName === 'Delete') {
        this.deleteLoading = true
      }
      try {
        if (actionName === 'Update') {
          await this.updateUser(
            this.userInfo.username,
            this.userInfo.email,
            this.userInfo.firstName,
            this.userInfo.lastName,
            this.password
          )
        } else if (actionName === 'Delete') {
          await this.delete()
        }
        this.showPopupWithMessage(`${actionName} completed successfully!`)
      } catch (error) {
        this.showPopupWithMessage(`Error during ${actionName}. Please try again later.`)
      } finally {
        if (actionName === 'Update') {
          this.updateUserLoading = false
        } else if (actionName === 'Delete') {
          this.deleteLoading = false
        }
      }
    },

    handleProfileUpdateClick() {
      this.showUpdatePopup = true
    },

    async confirmUpdate() {
      this.togglePopup('showUpdatePopup')
      await this.confirmAction('Update', [
        this.userInfo.username,
        this.userInfo.email,
        this.userInfo.firstName,
        this.userInfo.lastName,
        this.password
      ])
    },

    cancelUpdate() {
      this.togglePopup('showUpdatePopup')
      this.userInfo = { ...this.originalUserInfo }
      this.password = ''
      this.confirmPassword = ''
    },

    handleDelete() {
      this.togglePopup('showDeletePopup')
    },

    async confirmDelete() {
      this.togglePopup('showDeletePopup')
      await this.confirmAction('Delete')
      this.userInfo = {
        username: '',
        email: '',
        firstName: '',
        lastName: ''
      }
      this.password = ''
      this.confirmPassword = ''
      this.statusMessage = ''

      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.$router.push({ name: 'start' })
    },
    cancelDelete() {
      this.togglePopup('showDeletePopup')
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
    <TheContainer v-if="isLoggedIn">
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
            :disabled="isUpdateButtonDisabled"
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
  animation: fadeOut 3s forwards;
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
