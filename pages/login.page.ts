import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private username: Locator;
  private password: Locator;
  private submit: Locator;

  constructor(private page: Page) {
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[type="password"]');
    this.submit = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.submit.click();
  }
}
