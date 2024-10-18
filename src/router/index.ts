import { createRouter, createWebHistory } from 'vue-router'
import StartPage from '../views/frontpage.vue'
import LoginView from '../views/LogInView.vue'
import SignupView from '../views/SignUpView.vue'
import ContactView from '../views/ContactView.vue'
import TermsOfServiceView from '../views/TermsOfServiceView.vue'
import BackgroundView from '../views/BackgroundView.vue'

/*
import welcomeView from '../views/WelcomeView.vue'
import ChatView from '../views/ChatView.vue'
import ProfileView from '../views/ProfileView.vue'
import HowToView from '../views/HowToView.vue'
import ThreatTMapperAIView from '../views/ThreatTMapperAIView.vue'
import DocumentationView from '../views/DocumentationView.vue'
import TheTeamView from '../views/TheTeamView.vue'
*/

const routes = [
  {
    path: '/',
    name: 'start',
    component: StartPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/tos',
    name: 'termsofservice',
    component: TermsOfServiceView
  },
  {
    path: '/background',
    name: 'background',
    component: BackgroundView
  }
  /*
  {path: '/home',
  name: 'home',
  component: welcomeView
  },
  {
  path: '/chat',
  name: 'chat',
  component: ChatView
  },
  {
  path: '/profile',
  name: 'profile',
  component: ProfileView
  },
  {
  path: '/howto',
  name: 'howto',
  component: HowToView
  },
  {
  path: '/threattmapperai',
  name: 'threattmapperai',
  component: ThreatTMapperAIView
  },
  {
  path: '/documentation',
  name: 'documentation',
  component: DocumentationView
  },
  {
  path: '/theteam',
  name: 'theteam',
  component: TheTeamView
  },
  {
  path: '/settings',
  name: 'settings',
  component: SettingsView
  }
  */
  // Add other routes here
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
