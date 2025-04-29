import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#login_field');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('input[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://github.com/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
