import { Page } from '@playwright/test';

interface UserData {
  employeeName: string;
  username: string;
  password1: string;
  password2: string;
}

export class AdminPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.locator('a[href="/web/index.php/admin/viewAdminModule"]').click();
  }

  async addUser({ employeeName, username, password1,password2 }: UserData) {
    await this.page.locator('button:has-text("Add")').click();
    await this.page.locator('input[placeholder="Type for hints..."]').fill(employeeName);
    await this.page.getByText('Orange  Test').click()
    await this.page.locator('(//input[@class="oxd-input oxd-input--active"])[2]').fill(username);
    await this.page.waitForTimeout(1000)
    await this.page.locator('(//input[@type="password"])[1]').fill(password1);
    console.log(password1)
    await this.page.waitForTimeout(2000)
    await this.page.locator('(//input[@type="password"])[2]').fill(password2);
    console.log(password2)
    await this.page.locator('[class="oxd-select-text oxd-select-text--active"]').first().click()
    await this.page.waitForTimeout(1000)
    await this.page.getByText('Admin').last().click()
    await this.page.locator('[class="oxd-select-text oxd-select-text--active"]').last().click()
    await this.page.getByText('Enabled').click()
    await this.page.locator('button[type="submit"]').click();
  }

  async editUser(oldUsername: string, newUsername: string) {
    await this.page.locator('input[class="oxd-input oxd-input--active"]').last().click()
    await this.page.locator('input[class="oxd-input oxd-input--active"]').last().fill(oldUsername)
    await this.page.locator('[type="submit"]').click()
    await this.page.locator('[class="oxd-icon-button oxd-table-cell-action-space"]').last().click();
    await this.page.waitForTimeout(2000)
    await this.page.locator('(//input[@class="oxd-input oxd-input--active"])[2]').fill(newUsername);
    await this.page.locator('button[type="submit"]').click();
  }

  async deleteUser(username: string) {
    await this.page.waitForTimeout(6000)
    await this.page.locator('input[class="oxd-input oxd-input--active"]').last().fill(username)
    await this.page.locator('[type="submit"]').click()
    await this.page.locator('[class="oxd-icon bi-trash"]').click();
    await this.page.getByText(' Yes, Delete ').click();
  }

  async searchUser(Name: string) {
    await this.page.locator('[class="oxd-input oxd-input--active"]').last().fill(Name);
    await this.page.locator('[type="submit"]').click();
  }

  async getVisibleUsernames(): Promise<string[]> {
    return await this.page.locator('.oxd-table-cell:nth-child(2)').allTextContents();
  }
}
