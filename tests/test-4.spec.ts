import { test, expect } from '@playwright/test';

test('Direct message Matrix', async ({ page }) => {
await page.goto('http://localhost:8080/');
await page.goto('http://localhost:8080/#/welcome');

await page.getByRole('link', { name: 'Sign In' }).click();
await page.getByRole('button', { name: 'Edit' }).click();
await page.getByPlaceholder('Other homeserver').click();
await page.getByPlaceholder('Other homeserver').fill('http://localhost:8008');
await page.getByRole('button', { name: 'Continue' }).click();
await page.getByPlaceholder('username').click();
await page.getByPlaceholder('username').fill('user1.matrix');
await page.getByPlaceholder('username').press('Tab');
await page.getByPlaceholder('Password').fill('User..1234');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.getByRole('button', { name: 'Skip verification for now' }).click();
await page.getByRole('button', { name: 'I\'ll verify later' }).click();
await page.getByRole('button', { name: 'Send a Direct Message' }).click();
//await page.getByRole('button', { name: 'Show more' }).click();
let user=page.getByText('matrix_b').nth(1)
await user.scrollIntoViewIfNeeded()
await user.click()
//await page.locator('#mx_Dialog_StaticContainer > div > div.mx_Dialog > div.mx_InviteDialog_other.mx_InviteDialog_hasFooter.mx_Dialog_fixedWidth > div.mx_InviteDialog_content > div.mx_InviteDialog_userSections > div:nth-child(2) > div:nth-child(9) > span.mx_InviteDialog_tile_nameStack > div.mx_InviteDialog_tile_nameStack_name').click()
await page.getByRole('button', { name: 'Go' }).click();
await page.getByTestId('basicmessagecomposer').locator('div').click();
await page.getByTestId('basicmessagecomposer').fill('Hi Man');
await page.getByTestId('basicmessagecomposer').press('Enter');
await page.locator('#matrixchat > div.mx_MatrixChat_wrapper > div > div.mx_RoomView_wrapper > main > div > div > div.mx_RoomView_timeline.mx_RoomView_timeline_rr_enabled > div > div > ol > li.mx_NewRoomIntro > div > div.mx_EventTileBubble_title').waitFor({state:"visible"})
await page.getByRole('button', { name: 'User menu' }).click();
await page.getByText('Sign out').click();
});