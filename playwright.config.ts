import type { PlaywrightTestConfig } from "@playwright/test";

import * as userAuthProfile from "./lib/models/userAuthProfile";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig<userAuthProfile.UserAuthConfig> = {
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 10 * 1000,
    mattermost_admin: {
      user: "admin",
      password: "Admin..123456",
      baseURL: "http://localhost:8065",
      domain: "localhost",
      bearerToken: "s537n3t8zib1tx7eyd44qzqnbr",
    },
    mattermost_user1: {
      user: "user1.mm",
      password: "User..1234",
      baseURL: "http://localhost:8065",
      domain: "localhost"
    },
    matrix_a: {
      user: "matrix_a",
      baseURL: "http://localhost:8008",
      domain: "localhost",
      bearerToken:
        "MDAxN2xvY2F0aW9uIGxvY2FsaG9zdAowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjZjaWQgdXNlcl9pZCA9IEBtYXRyaXhfYjpsb2NhbGhvc3QKMDAxNmNpZCB0eXBlID0gYWNjZXNzCjAwMjFjaWQgbm9uY2UgPSBBYl9hbWthI0daSzgtfjdICjAwMmZzaWduYXR1cmUgOReBLkPURCMNtzORS9fpogQqVa3IWN9ZEu5gXW91QTMK",
    },
    matrix_admin: {
      user: "admin",
      baseURL: "http://localhost:8008",
      domain: "localhost",
      bearerToken:
        "MDAxN2xvY2F0aW9uIGxvY2FsaG9zdAowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjNjaWQgdXNlcl9pZCA9IEBhZG1pbjpsb2NhbGhvc3QKMDAxNmNpZCB0eXBlID0gYWNjZXNzCjAwMjFjaWQgbm9uY2UgPSBXVU9yUTVRMFRnUkNjME1ACjAwMmZzaWduYXR1cmUgdYKA-yuTQ5JV5O0HWRak-48xavOYgA1MMc6A1V_Uw5kK",
    },
    matrix_user1: {
      user: "user1.matrix",
      password:"User..1234",
      baseURL: "http://localhost:8008",
      additional: {
        elementURL:"http://localhost:8080"
      }
    },
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:8065",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    video: "on",
  },

  /* Configure projects for major browsers */
  /*
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    }
  ]
  */
};

export default config;
