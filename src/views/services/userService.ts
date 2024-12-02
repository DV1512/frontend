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
  public async updateUser(
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    password?: string
  ) {
    if (!first_name || !last_name || !username || !email) {
      console.error('Required fields are missing')
      return null
    }

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.access_token}`
      },
      body: JSON.stringify({
        username,
        email,
        first_name,
        last_name,
        ...(password && { password })
      })
    }

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        console.error(`User update failed: ${response.status} ${response.statusText}`)
        return null
      }

      console.log('User update successful. Fetching latest user data...')
      return await this.getCurrentUser()
    } catch (error) {
      console.error('Network error during user update:', error)
      return null
    }
  }

  /**
   * Delete user
   */
  public async deleteUser() {
    if (!this.access_token) {
      console.error('No access token available for deleting user')
      return
    }

    const url = import.meta.env.VITE_BACKEND_URL + '/api/v1/user'
    const options = {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.access_token}` }
    }

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        console.error(`Failed to delete user: ${response.status} ${response.statusText}`)
        return
      }

      console.log('User deleted successfully')
    } catch (error) {
      console.error('Network error while deleting user:', error)
    }
  }
}

export default new UserService()
