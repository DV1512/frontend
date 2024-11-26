import { passwordLogin } from 'sdk'

class AuthService {
  private access_token: string | undefined
  private refresh_token: string | undefined
  private expieries: Date | null = null
  public loading: boolean = false

  /**
   * login
   */
  public async login(username: string, password: string) {
    if (!username || !password) {
      console.error('Username or password is missing')
      return
    }
    try {
      await passwordLogin(username, password)
        .then((res) => {
          this.access_token = res.access_token
          this.refresh_token = res.refresh_token

          console.log(res.access_token)

          this.expieries = new Date(res.expires_in + new Date().getTime() / 1000)
        })
        .catch((err) => {
          console.error('Error occured when fetching token', err)
        })
    } catch (error) {
      console.log('error', error)
    }
  }

  /**
   * signup
   */
  public async signup(
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    password: string
  ) {
    if (!first_name || !last_name || !username || !email || !password) {
      console.error('Username, email, or password is missing')
      return
    }

    fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/oauth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        username,
        first_name,
        last_name
      })
    })
  }
  /**
   * getAccessToken
   */
  /* public getAccessToken(): string | null {
    console.log('Sccess token:', this.access_token)
    if (this.access_token != undefined) {
      return this.access_token!
    }

    console.error('User is not logged in or the access token has expiered')
    return null
  }
  */
  /*
  public getRefreshToken(): string | null {
    if (this.refresh_token != undefined) {
      return this.refresh_token!
    }

    console.error('User is not logged in')
    return null
  }
  */
  public async getAccessToken(): Promise<string | null> {
    if (!this.access_token || (this.expieries && new Date() > this.expieries)) {
      console.log('Access token expired or unavailable, refreshing...')
      await this.refreshToken() // Implement token refresh logic here
    }
    console.log('Access token:', this.access_token)
    return this.access_token || null
  }
  private async refreshToken() {
    if (!this.refresh_token) {
      console.error('No refresh token available to refresh access token')
      return
    }
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/oauth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh_token: this.refresh_token })
      })
      if (!response.ok) {
        console.error('Failed to refresh token:', await response.text())
        return
      }

      const data = await response.json()
      this.access_token = data.access_token
      this.expieries = new Date(data.expires_in + new Date().getTime() / 1000)
      console.log('Access token refreshed successfully')
    } catch (error) {
      console.error('Error refreshing token:', error)
    }
  }

  public setAccessToken(token: string) {
    this.access_token = token
  }
  /**
   * logout
   */
  public async logout() {
    if (!this.access_token) {
      console.error('No access token available for logout')
      return
    }

    const url = import.meta.env.VITE_BACKEND_URL + '/api/v1/oauth/logout'
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.access_token}` }
    }

    try {
      const response = await fetch(url, options)

      let data
      try {
        data = await response.json()
      } catch (err) {
        console.warn('No JSON response during logout:', err)
      }

      if (!response.ok) {
        console.error(`Logout failed with status ${response.status}: ${response.statusText}`)
      } else {
        console.log('Logout successful:', data || 'No response body')
      }
    } catch (error) {
      console.error('Network error during logout:', error)
    } finally {
      this.access_token = undefined
      this.refresh_token = undefined
      this.expieries = null
      console.log('Auth tokens cleared')
    }
  }
}

export default new AuthService()
