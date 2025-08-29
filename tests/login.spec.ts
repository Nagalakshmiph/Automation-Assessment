import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { testData } from '../testdata/exampletestdata';
test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const login = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await login.login(testData.logInData.userName,testData.logInData.password);

  await expect(dashboardPage.userDropdown).toBeVisible();
  await page.screenshot({ path: 'screenshots/login-success.png' });
});
test.describe('Negative Login Scenarios', () => {
  for (const data of testData.negativeLogInData) {
    test(`Login Failure - ${data.testCase}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(data.userName, data.password);

      const errorMessage = page.getByText(data.expectedError, { exact: false }).first();
      await expect(errorMessage).toBeVisible();

      await page.screenshot({ path: `screenshots/login-failure-${data.testCase.replace(/ /g, '-')}.png` });
    });
  }
});

