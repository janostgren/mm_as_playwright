import { test, expect } from '@playwright/test';

test.describe.serial('Mattermost - API testing', () => {
    let xx = 1;
    let apiContext;
    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({
            // All requests we send go to this API endpoint.
            baseURL: 'http://localhost:8065/',
            extraHTTPHeaders: {
                // We set this header per GitHub guidelines.
                //'Accept': 'application/vnd.github.v3+json',
                // Add authorization token to all requests.
                // Assuming personal access token available in the environment.
                Authorization: 'Bearer s537n3t8zib1tx7eyd44qzqnbr',
            },
        });
    });

    test('Get me - bot user', async ({ request }) => {
        const me = await apiContext.get(`api/v4/users/me`, {});
        expect(me.ok()).toBeTruthy();
        let response = await me.json();
    

    });

    test('Get Users', async ({}) => {
        const me = await apiContext.get(`api/v4/users`, {});
        expect(me.ok()).toBeTruthy();
        let response = await me.json();
        xx = 1;
    });
    test('Get Channels', async ({}) => {
        const me = await apiContext.get(`api/v4/channels`, {});
        expect(me.ok()).toBeTruthy();
        let response = await me.json();

        xx = 1;
    });
});
