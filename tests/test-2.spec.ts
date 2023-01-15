import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  let homeServer =
    "http://ec2-54-216-207-175.eu-west-1.compute.amazonaws.com:8008";

  await page.route("**/_matrix/client/r0/login", async (route) => {
    let req = route.request();

    let url = req.url();
    let method = req.method();
    if (method === "POST" && url.includes("/_matrix/client/r0/login")) {
      let f = await route.fetch();
      let postData = await f.json();
      //let postData = req.postDataJSON();

      if (postData?.well_known?.["m.homeserver"]?.base_url) {
        postData.well_known = {
          "m.homeserver": {
            base_url: homeServer,
          },
        };
        await route.fulfill({ json: postData });
        return;
      }
    }
    return route.continue();
  });

  await page.goto(
    "http://ec2-54-216-207-175.eu-west-1.compute.amazonaws.com:8080/",
    { waitUntil: "networkidle" }
  );

  //await expect(page.title()).toBe('Element')
  let riskyBrowser = page.locator(
    "#matrixchat > div > div > div:nth-child(2) > div > div > button"
  );
  /*
  await page
    .getByRole("button", {
      name: "I understand the risks and wish to continue",
    })
    .click();
  */
 

  let v = await riskyBrowser.isVisible();
  if (v) {
    await riskyBrowser.click();
  }

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByPlaceholder("Other homeserver").click();
  await page.getByPlaceholder("Other homeserver").fill(homeServer);
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("username").fill("user1");
  await page.getByPlaceholder("username").press("Tab");

  await page.getByPlaceholder("Password").fill("User..1234");
  //  await page.getByPlaceholder('Password').press('Enter');

  const [response] = await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes("/_matrix/client/r0/login") && response.ok()
    ),
    page.getByPlaceholder("Password").press("Enter"),
  ]);
  let json = await response.json();

  //await page.getByRole('button', { name: 'Sign in' }).click();
  let skip = page.getByRole("button", { name: "Skip verification for now" });
  await expect(skip).toBeVisible();
  await page.getByRole("button", { name: "Skip verification for now" }).click();
  await page.getByRole("button", { name: "I'll verify later" }).click();
});
