import { passwordLogin } from 'sdk'

class AuthService {
  private access_token: string | undefined
  private refresh_token: string | undefined
  private expieries: Date | null = null

  /**
   * login
   */
  public async login(username: string, password: string) {
    if (!username || !password) {
      console.error('Username or password is missing')
      return
    }
    try {
      passwordLogin(username, password)
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
}

export default new AuthService()