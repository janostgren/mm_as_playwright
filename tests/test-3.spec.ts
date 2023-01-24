import { test, expect } from '@playwright/test';

test('Direct message Mattermost', async ({ page }) => {
  await page.goto('http://localhost:8065/');
  await page.goto('http://localhost:8065/landing#/');
  await page.getByRole('link', { name: 'View in Browser' }).click();
  await page.locator('#input_loginId').click();
  await page.locator('#input_loginId').fill('user1.mm');
  await page.locator('#input_loginId').press('Tab');
  await page.locator('#input_password-input').fill('User..1234');
  await page.getByTestId('saveSetting').click();
  await page.getByRole('button', { name: 'Write a direct message' }).click();
  await page.getByText('Search for people').nth(1).click();
  await page.getByRole('textbox', { name: 'Search for people' }).fill('m');
  //await page.getByText('- user2.matrix').click();
  await page.locator('#displayedUserNamematrix_matrix_a').click()
  await page.getByTestId('saveSetting').click();
  await page.getByTestId('post_textbox').click();
  await page.getByTestId('post_textbox').fill('Hi User2');
  await page.getByTestId('SendMessageButton').click();
  await page.locator('#RightControlsContainer').getByRole('img', { name: 'user profile image' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
});