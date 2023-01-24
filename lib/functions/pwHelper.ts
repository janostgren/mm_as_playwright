import { expect, Locator, Page, TestInfo } from "@playwright/test";

//First options is not valid  for selection in TicketMonster
export async function selectRandomOption(
  select: Locator,
  firstNotValid: boolean = true
) {
  await expect(select).toBeEditable();
  let options = select.locator("option");
  let count = await options.count();
  let offset = firstNotValid ? 1 : 0;
  expect(count).toBeGreaterThan(offset);

  let randIndex = Math.floor(Math.random() * (count - offset) + offset);
  await select.selectOption({ index: randIndex });
}

export async function randomChildClick(page: Page, selector: string): Promise<number> {
  let locator = page.locator(selector);
  //await locator.first().isVisible()
  let count = await locator.count();
  expect(count).toBeGreaterThanOrEqual(1);
  let randomIdx = Math.floor(Math.random() * count);
  await locator.nth(randomIdx).click();
  return randomIdx;
}
export async function takeScreenshot(
  locator: Locator,
  info: TestInfo,
  name: string = "Screenshot"
) {
  let buff = await locator.screenshot();
  await info.attach(name, { body: buff, contentType: "image/png" });
}

export async function takePageScreenshot(info: TestInfo, page: Page) {
    let screen = await page.screenshot();
    await info.attach('screenshot', { body: screen, contentType: 'image/png' });
}

export function infoAnnotation(info: TestInfo, description: string) {
    info.annotations.push({ type: 'info', description: description });
}
