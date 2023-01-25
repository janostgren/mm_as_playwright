import { expect, APIRequestContext } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { test } from "../../lib/fixtures/apiProfilesFixture";
import { MatrixApiClient } from "../../lib/apiModels/matrixApiClient";
import { MattermostApiClient } from "../../lib/apiModels/mattermostApiClient";
import * as pwHelpers from "../../lib/functions/pwHelper"
test.describe("The Bridge - User Mapping", () => {
  let matrixContext: APIRequestContext;
  let matrixApiClient: MatrixApiClient;
  let mmContext: APIRequestContext;
  let mmApiClient: MatrixApiClient;
  let serverName='localhost'

  test.beforeAll(async ({ playwright, mattermost_admin, matrix_admin }) => {
    matrixApiClient = new MatrixApiClient(matrix_admin, playwright.request);
    matrixContext = await matrixApiClient.authenticate();
    mmApiClient = new MattermostApiClient(mattermost_admin, playwright.request);
    mmContext = await mmApiClient.authenticate();
  });

  test("User Mapping Mattermost <-> Matrix", async ({ page }) => {
    await test.step("Mattermost me", async () => {
      const get = await mmContext.get(`/api/v4/users/me`, {});
      expect(get.ok()).toBeTruthy();
      let me = await get.json();
      console.log(me);
      //expect(me.username).toBe("admin");
      expect(me.roles.includes("system_admin")).toBeTruthy();
    });

    let mmUsers=await test.step("Mattermost Users", async () => {
      const get = await mmContext.get(`api/v4/users`, {});
      expect(get.ok()).toBeTruthy();
      let allUsers = await get.json();
      console.log(allUsers);
      let users: any[] = allUsers.filter((user) => {
        return !user?.is_bot;
      });
      return users;
    });
    let synapseUsers=await test.step("Synapse Users", async () => {
        const get = await matrixContext.get(`/_synapse/admin/v2/users`, {});
        expect(get.ok()).toBeTruthy();
        let allUsers = await get.json();
        //console.log(allUsers);
        let synapseUsers:any[] = []
        for (let user of allUsers.users) {
            const get = await matrixContext.get(`/_synapse/admin/v2/users/${user.name}`, {});
            expect(get.ok()).toBeTruthy();
            let synapseUser= await get.json()
            //console.log(synapseUser)
            synapseUsers.push(synapseUser)
        }
        console.log(synapseUsers)
        return synapseUsers;
      });
      let matrixUsers=await test.step("Matrix Users", async () => {
        const post = await matrixContext.post(`/_matrix/client/v3/user_directory/search`, 
        {
            data: {
                limit:10000,
                search_term:serverName
            }
        });
        expect(post.ok()).toBeTruthy();
        let response = await post.json();
        let users=response.results
        console.log(users)
        return users;
      });
      pwHelpers.infoAnnotation(test.info(),`Number of Mattermost users = ${mmUsers.length}`)
      pwHelpers.infoAnnotation(test.info(),`Number of Synapse users = ${synapseUsers.length}`)

  });
});
