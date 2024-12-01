class UserService {
  private access_token: string | null = null

  constructor() {
    this.access_token = import.meta.env.VITE_ACCESS_TOKEN || null
  }

  /**
   * Fetch current user info
   */
  public async getCurrentUser() {
    if (!this.access_token) {
      console.error('No access token available for fetching user info')
      return
    }

    const url = import.meta.env.VITE_BACKEND_URL + '/api/v1/user'
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.access_token}` }
    }

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        console.error(`Failed to fetch user info: ${response.status} ${response.statusText}`)
        return null
      }

      const data = await response.json()
      console.log('Current user info:', data)
      return data
    } catch (error) {
      console.error('Network error while fetching user info:', error)
      return null
    }
  }

  /**
   * Update user data
   */
  public async updateUser(payload: { first_name?: string; last_name?: string; username?: string }) {
    if (!this.access_token) {
      console.error('No access token available for user update')
      return
    }

    const url = import.meta.env.VITE_BACKEND_URL + '/api/v1/user'
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.access_token}`
      },
      body: JSON.stringify(payload)
    }

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        console.error(`User update failed: ${response.status} ${response.statusText}`)
        return null
      }

      const data = await response.json()
      console.log('User update successful:', data)
      return data
    } catch (error) {
      console.error('Network error during user update:', error)
      return null
    }
  }
}

export default new UserService()
