import { test, expect } from '@playwright/test';

test.describe.serial('Matrix - API testing', () => {
    let xx = 1;
    let apiContext;
    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({
            // All requests we send go to this API endpoint.
            baseURL: 'http://localhost:8008',
            extraHTTPHeaders: {
                // We set this header per GitHub guidelines.
                //'Accept': 'application/vnd.github.v3+json',
                // Add authorization token to all requests.
                // Assuming personal access token available in the environment.
                //'Authorization':'MDAxN2xvY2F0aW9uIGxvY2FsaG9zdAowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjZjaWQgdXNlcl9pZCA9IEBtYXRyaXhfYTpsb2NhbGhvc3QKMDAxNmNpZCB0eXBlID0gYWNjZXNzCjAwMjFjaWQgbm9uY2UgPSAwb3Y6eTZVdHojUk4jbFprCjAwMmZzaWduYXR1cmUgNNZKnOVRzj5svh9pEM0UUEqtXYnHjnj9XyNLJ1_uKoAK'
                Authorization:
                    'Bearer syt_YnJpZGdlYWRtaW4_JoxiEWljSnpIybaKgheJ_3grklR',
            },
        });
    });

    test('Get versions', async ({}) => {
        const versions = await apiContext.get(`/_matrix/client/versions`, {});

        expect(versions.ok()).toBeTruthy();
        let response = await versions.json();
        xx = 1;
    });

    test('Get Public Rooms', async ({}) => {
        const rooms = await apiContext.get(
            `/_matrix/client/r0/publicRooms`,
            {},
        );
        let t = rooms.statusText();
        expect(rooms.ok()).toBeTruthy();
        let response = await rooms.json();
        xx = 1;
    });
    test('Get The room', async ({}) => {
        let path='/_matrix/client/r0/directory/room/'+encodeURIComponent("#town-square:localhost");
        const room = await apiContext.get(
            `${path}`,
            {},
        );

        expect(room.ok()).toBeTruthy();
        let response = await room.json();
        xx = 1;
    });
});
