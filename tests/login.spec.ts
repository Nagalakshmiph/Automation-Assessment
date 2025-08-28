import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  await expect(dashboardPage.userDropdown).toBeVisible();
  await page.screenshot({ path: 'screenshots/login-success.png' });
});
