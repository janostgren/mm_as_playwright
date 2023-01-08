import {expect,APIRequestContext } from '@playwright/test';
import {test} from '../../lib/fixtures/apiProfilesFixture'
import {MattermostApiClient} from '../../lib/apiModels/mattermostApiClient'
test.describe.serial('Mattermost - API testing', () => {
  
    let apiContext;
    test.beforeAll(async ({ playwright,admin_mm }) => {
        let mmApiClient:MattermostApiClient = new MattermostApiClient
        (admin_mm,playwright.request)
        apiContext =await mmApiClient.authenticate()
    });

    test('Get me', async ({}) => {
    
        const me = await apiContext.get(`/api/v4/users/me`, {});
        expect(me.ok()).toBeTruthy();
        let response = await me.json();
        console.log(response)
        expect(response.username).toBe('admin')
    });

    test('Get Users', async ({}) => {
        const users = await apiContext.get(`api/v4/users`, {});
        expect(users.ok()).toBeTruthy();
        let response = await users.json();
        console.log(response)
    });
    test('Get Channels', async ({}) => {
        const channels = await apiContext.get(`api/v4/channels`, {});
        expect(channels.ok()).toBeTruthy();
        let response = await channels.json();
        console.log(response)
    });
});
