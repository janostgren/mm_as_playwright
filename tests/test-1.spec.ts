import { test, expect } from '@playwright/test';

test('Test spaces', async ({ page }) => {
  test.setTimeout(60*1000)
  await page.goto('http://localhost:8080/');
  
 
  await page.goto('http://localhost:8080/#/welcome');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByPlaceholder('Other homeserver').click();
  await page.getByPlaceholder('Other homeserver').fill('http://localhost:8008');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByPlaceholder('username').click();
  await page.getByPlaceholder('username').fill('user2.matrix');
  await page.getByPlaceholder('username').press('Tab');
  await page.getByPlaceholder('Password').fill('User..1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Skip verification for now' }).click();
  await page.getByRole('button', { name: 'I\'ll verify later' }).click();
  await page.getByRole('button', { name: 'Dismiss' }).click();
  await page.getByRole('treeitem', { name: 'Home' }).getByRole('button', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'My-First-Space' }).click();
  await page.getByRole('group', { name: 'Rooms' }).getByText('#Space-room-1').click();
  await page.getByRole('group', { name: 'Rooms' }).getByText('#Space-room-1').click();
  await page.getByTestId('basicmessagecomposer').locator('div').click();
  await page.getByTestId('basicmessagecomposer').fill('Kalle anke');
  await page.getByTestId('sendmessagebtn').click();
  await page.getByText('#Space-room-2').click();
  await page.getByTestId('basicmessagecomposer').locator('div').click();
  await page.getByTestId('basicmessagecomposer').fill('Kalle 2');
  await page.getByTestId('basicmessagecomposer').press('Enter');
  await page.getByRole('button', { name: 'User menu' }).click();
  await page.getByText('Sign out').click();
});