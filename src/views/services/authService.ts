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
      const res = await passwordLogin(username, password)
      this.access_token = res.access_token
      this.refresh_token = res.refresh_token
      console.log(res.access_token)

      this.expieries = new Date(res.expires_in * 1000 + new Date().getTime())
    } catch (error) {
      console.error('Error occurred when fetching token', error)
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
   * updateUser
   */
  public async updateUser() {
    if (!this.access_token) {
      console.error('No access token available for user update')
      return
    }

    const url = import.meta.env.VITE_BACKEND_URL + '/api/v1//user'
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
        console.warn('No JSON response during user update:', err)
      }

      if (!response.ok) {
        console.error(`User update failed with status ${response.status}: ${response.statusText}`)
      } else {
        console.log('User update successful:', data || 'No response body')
      }
    } catch (error) {
      console.error('Network error during user update:', error)
    }
  }

  /**
   * getAccessToken
   */
  public getAccessToken(): string | null {
    if (this.access_token != undefined) {
      return this.access_token!
    }

    console.error('User is not logged in or the access token has expiered')
    return null
  }

  public getRefreshToken(): string | null {
    if (this.refresh_token != undefined) {
      return this.refresh_token!
    }

    console.error('User is not logged in')
    return null
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
