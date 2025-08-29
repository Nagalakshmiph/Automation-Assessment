import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { testData } from '../testdata/exampletestdata';
import { DashboardPage } from '../pages/dashboard.page'
test('Mock dashboard API response and assert status', async ({ page }) => {
  await page.route('**/dashboard/index', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Mocked Dashboard!' }),
    });
  });

  const login = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  await login.goto();

  const [response] = await Promise.all([
    page.waitForResponse((res) => res.url().includes('/dashboard/index')),
    login.login(testData.logInData.userName, testData.logInData.password),
  ]);

  expect(response.status()).toBe(200);

  await expect(dashboardPage.dashboardHeading).toBeVisible();
});
