import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AdminPage } from '../pages/admin.page';
import { testData } from '../testdata/exampletestdata';
let faker;
test('Add, edit, and delete a user', async ({ page }) => {
  faker = (await import('@faker-js/faker')).faker; 
  const login = new LoginPage(page);
  const admin = new AdminPage(page);

  await login.goto();
  await login.login(testData.logInData.userName,testData.logInData.password);
  await admin.goto();
  
  const password ='1'+ faker.internet.password();

const newUser = {
  employeeName: 'Test',
  username: faker.person.fullName(),
  password1: password,
  password2: password,
};

  // Add
  await admin.addUser(newUser);
  await expect(page.getByText(testData.successMessages.successfullySaved)).toBeVisible()

  // Edit
  await admin.editUser(newUser.username, testData.logInData.updatesUser);
  await expect(page.getByText(testData.successMessages.successfullyUpdated)).toBeVisible()

 // Delete
  await admin.deleteUser(testData.logInData.updatesUser);
  await expect(page.getByText(testData.successMessages.successfullyDeleted)).toBeVisible()

// search Again
await admin.searchUser(testData.logInData.updatesUser);
await expect(page.getByText(testData.successMessages.noRecordsFound).first()).toBeVisible()
})
