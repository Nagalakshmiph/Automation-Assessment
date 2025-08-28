import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AdminPage } from '../pages/admin.page';
import { testData } from '../testdata/exampletestdata';
test('Search user by partial name', async ({ page }) => {
  const login = new LoginPage(page);
  const admin = new AdminPage(page);

  await login.goto();
  await login.login(testData.logInData.userName,testData.logInData.password);
  await admin.goto();

  await admin.searchUser(testData.logInData.partialText);
  const results = await admin.getVisibleUsernames();

  for (const name of results) {
    expect(name.toLowerCase()).toContain(testData.logInData.partialText);
  }
});
