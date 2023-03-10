
import { expect } from '@playwright/test';
import { test} from "../../lib/fixtures/apiProfilesFixture";
import { faker } from "@faker-js/faker";

test('Mattermost send message', async ({ page,mattermost_user1 }) => {
  test.setTimeout(120000);
  await page.goto(mattermost_user1.baseURL);
  await page.goto(`${mattermost_user1.baseURL}/landing#/`);
  await page.getByRole('link', { name: 'View in Browser' }).click();

  await page.locator('#input_loginId').click();
  await page.locator('#input_loginId').fill(mattermost_user1.user);
  await page.getByPlaceholder('Password').click();
  await page.locator('#input_password-input').fill(mattermost_user1.password);
  await page.getByRole('button', { name: '󰛐' }).click();
  await page.getByTestId('saveSetting').click();
  await page.getByRole('link', { name: 'off-topic public channel' }).click();
  await page.getByTestId('post_textbox').click();
  const message=faker.lorem.paragraph()
  await page.getByTestId('post_textbox').fill(message);
  await page.getByTestId('post_textbox').press('Enter');
  await page.locator('#RightControlsContainer').getByRole('img', { name: 'user profile image' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
});