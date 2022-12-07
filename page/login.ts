import { Page } from "playwright-core"

export class LoginPage {
  page: Page
  readonly userNameTextbox: string
  readonly passwordTextbox: string
  readonly loginBtn: string

  constructor(page: Page) {
    this.page = page
    this.userNameTextbox = '#user-name'
    this.passwordTextbox = '#password'
    this.loginBtn = '#login-button'
  }

  async inputUsernameTextbox(value: string): Promise<void> {
    await this.page.waitForSelector(this.userNameTextbox, { state: 'visible', strict: false });
    await this.page.locator(this.userNameTextbox).type(value)
  }

  async inputPasswordTextbox(value: string): Promise<void> {
    await this.page.locator(this.passwordTextbox).type(value)
  }

  async clickLoginBtn(): Promise<void> {
    await this.page.locator(this.loginBtn).click()
  }
}