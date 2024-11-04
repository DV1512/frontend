import { createRouter, createWebHistory } from 'vue-router'
import StartPage from '../views/FrontPage.vue'
import LoginView from '../views/LogInView.vue'
import SignupView from '../views/SignUpView.vue'
import ContactView from '../views/ContactView.vue'
import TermsOfServiceView from '../views/TermsOfServiceView.vue'
import BackgroundView from '../views/BackgroundView.vue'
import ThreatTMapperAIView from '../views/ThreatTMapperAIView.vue'
import TheTeamView from '../views/TheTeamView.vue'
import HowToView from '../views/HowToView.vue'
import DocumentationView from '../views/DocumentationView.vue'
import ProfileView from '../views/ProfileView.vue'
import ChatView from '../views/ChatView.vue'
import welcomeView from '../views/WelcomeView.vue'
import OauthRedirect from '@/views/OauthRedirect.vue'
import ErrorPage from '@/views/ErrorPage.vue'

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
    path: '/redirect',
    name: 'oauthRedirect',
    component: OauthRedirect
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
  },
  {
    path: '/ai',
    name: 'ai',
    component: ThreatTMapperAIView
  },
  {
    path: '/team',
    name: 'team',
    component: TheTeamView
  },
  {
    path: '/howto',
    name: 'howto',
    component: HowToView
  },
  {
    path: '/documentation',
    name: 'documentation',
    component: DocumentationView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView
  },
  {
    path: '/home',
    name: 'home',
    component: welcomeView
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorPage
  }
  /*,
  {
  path: '/chat',
  name: 'chat',
  component: ChatView
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
