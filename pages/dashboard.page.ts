import { Page } from '@playwright/test';

export class DashboardPage {
  userDropdown;

  constructor(private page: Page) {
    this.userDropdown = this.page.locator('.oxd-userdropdown-name');
  }
}
