import { Page } from '@playwright/test';

export class DashboardPage {
  userDropdown;
  dashboardHeading;

  constructor(private page: Page) {
    this.userDropdown = this.page.locator('.oxd-userdropdown-name');
    this.dashboardHeading = this.page.locator("//h6[text()='Dashboard']");
  }
}
