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
  reporter: [['html'], ['github']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 10 * 1000,
    mattermost_admin: {
      user: "admin",
      password: "Admin..123456",
      baseURL: "http://ec2-54-216-207-175.eu-west-1.compute.amazonaws.com:8065",
      domain: "localhost",
      bearerToken: "s537n3t8zib1tx7eyd44qzqnbr",
    },
    mattermost_user1: {
      user: "user1.mm",
      password: "User..1234",
      baseURL: "http://ec2-54-216-207-175.eu-west-1.compute.amazonaws.com:8065",
      domain: "localhost"
    },
    matrix_a: {
      user: "matrix_a",
      baseURL: "http://ec2-54-216-207-175.eu-west-1.compute.amazonaws.com:8008",
      domain: "localhost",
      bearerToken:
        "MDAxN2xvY2F0aW9uIGxvY2FsaG9zdAowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjZjaWQgdXNlcl9pZCA9IEBtYXRyaXhfYjpsb2NhbGhvc3QKMDAxNmNpZCB0eXBlID0gYWNjZXNzCjAwMjFjaWQgbm9uY2UgPSBBYl9hbWthI0daSzgtfjdICjAwMmZzaWduYXR1cmUgOReBLkPURCMNtzORS9fpogQqVa3IWN9ZEu5gXW91QTMK",
    },
    matrix_user1: {
      user: "user1.matrix",
      password:"User..1234",
      baseURL: "http://ec2-54-216-207-175.eu-west-1.compute.amazonaws.com:8008",
      additional: {
        elementURL:"http://ec2-54-216-207-175.eu-west-1.compute.amazonaws.com:8080"
      }
    },
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:8065",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    video: "on",
    
  },

};

export default config;
