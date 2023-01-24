import { test, expect } from '@playwright/test';

test('Matrix Direct to Existing user', async ({ page }) => {
 
  await page.goto('http://localhost:8080/');
  await page.goto('http://localhost:8080/#/welcome');
  
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByPlaceholder('Other homeserver').fill('http://localhost:8008');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByPlaceholder('username').click();
  await page.getByPlaceholder('username').fill('user1.matrix');
  await page.getByPlaceholder('username').press('Tab');
  await page.getByPlaceholder('Password').fill('User..1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Skip verification for now' }).click();
  await page.getByRole('button', { name: 'I\'ll verify later' }).click();
  await page.getByRole('button', { name: 'Later' }).click();
  await page.getByText('user1.mm [mm]').click();
  await page.getByTestId('basicmessagecomposer').locator('div').click();
  await page.getByTestId('basicmessagecomposer').fill('Sending a new message');
  await page.getByTestId('basicmessagecomposer').press('Enter');
  await page.getByTestId('basicmessagecomposer').locator('div').click();
  await page.getByText('End-to-end encryption isn\'t enabled').click();
  //await page.getByRole('navigation').getByRole('button', { name: 'Expand' }).click();
  await page.getByRole('button', { name: 'User menu' }).click();
  await page.getByText('Sign out').click();
});