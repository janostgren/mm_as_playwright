import { expect } from '@playwright/test';
import { test} from "../../lib/fixtures/apiProfilesFixture";

test('Element - Post message', async ({ page,matrix_user1 }) => {
  test.setTimeout(120000);
  let elementURL=matrix_user1?.additional?.elementURL 
  expect(elementURL,"ElementURL must be in additional").toBeDefined()

  //await page.goto('http://localhost:8080/');
  await page.goto(`${elementURL}/#/welcome`);
  
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByPlaceholder('Other homeserver').fill(matrix_user1.baseURL);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByPlaceholder('username').fill(matrix_user1.user);
  await page.getByPlaceholder('username').press('Tab');
  await page.getByPlaceholder('Password').fill(matrix_user1.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Skip verification for now' }).click();
  await page.getByRole('button', { name: 'I\'ll verify later' }).click();
  await page.getByRole('button', { name: 'Dismiss' }).click();
  await page.getByText('#town-square:localhost').click();
  let input=page.locator('div.mx_BasicMessageComposer_input.mx_BasicMessageComposer_input_shouldShowPillAvatar')
  await input.click()
  await input.type('Check the message from test '+Date.now().toString())
  await input.press('Enter')
  await page.getByRole('button', { name: 'User menu' }).click();
  await page.getByText('Sign out').click();
});