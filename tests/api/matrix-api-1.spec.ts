import { expect, APIRequestContext } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { test } from "../../lib/fixtures/apiProfilesFixture";
import { MatrixApiClient } from "../../lib/apiModels/matrixApiClient";
import { MattermostApiClient } from "../../lib/apiModels/mattermostApiClient";

test.describe("Matrix - API Send message", () => {
  let matrixContext: APIRequestContext;
  let matrixApiClient: MatrixApiClient;
  let mmContext: APIRequestContext;
  let mmApiClient: MatrixApiClient;
  let roomName: string = "town-square";
  let hackerPhrase = faker.hacker.phrase();

  test.beforeAll(async ({ playwright, matrix_a, admin_mm }) => {
    matrixApiClient = new MatrixApiClient(matrix_a, playwright.request);
    matrixContext = await matrixApiClient.authenticate();
    mmApiClient = new MattermostApiClient(admin_mm, playwright.request);
    mmContext = await mmApiClient.authenticate();
  });

  test("Send Text message", async ({}) => {
    let publicRooms: any[] = await test.step("Get Public rooms", async () => {
      const rooms = await matrixContext.get(
        `/_matrix/client/r0/publicRooms?limit=100`,
        {}
      );
      expect(rooms.ok()).toBeTruthy();
      let json = await rooms.json();
      console.log(json);
      return json.chunk;
    });

    let theRoom =
      await test.step(`Get the public rooms: ${roomName} `, async () => {
        expect(
          publicRooms.length,
          "More than one public room expected."
        ).toBeGreaterThanOrEqual(2);
        let roomAlias = `#${roomName}:${matrixApiClient.getDomain()}`;
        let theRoom = publicRooms.find((room) => {
          return room.canonical_alias === roomAlias;
        });
        expect(theRoom).not.toBeUndefined();
        return theRoom;
      });

    let theMessage = await test.step("Send Text Message", async () => {
      const transactionId = "m." + Date.now();
      let message = `Strange message seen:\n${hackerPhrase}\n from ${faker.internet.email()}`;

      let p = `/_matrix/client/r0/rooms/${theRoom.room_id}/send/m.room.message/${transactionId}`;
      let apiResponse = await matrixContext.put(p, {
        data: {
          body: message,
          msgtype: "m.text",
        },
      });
      let statusText = apiResponse.statusText();
      expect(apiResponse.ok()).toBeTruthy();
      let json = await apiResponse.json();
      return message;
    });
  });

  test("Get the post in Mattermost", async ({}) => {
    let theChannel =
      await test.step("Get The channel from Mattermost", async () => {
        const channels = await mmContext.get(
          `/api/v4/users/me/channels?page=0&per_page=200`,
          {}
        );
        expect(channels.ok()).toBeTruthy();
        let json = await channels.json();
        let theChannel = json.find((channel) => {
          return channel.name === roomName;
        });
        expect(theChannel).toBeDefined();
        return theChannel;
      });

    await test.step("Get channel messages from Mattermost", async () => {
      let since: number = Date.now() - 60 * 1000;

      const apiResponse = await mmContext.get(
        `/api/v4/channels/${theChannel.id}/posts?page=0&per_page=200&since=${since}`,
        {}
      );
      expect(apiResponse.ok()).toBeTruthy();
      let json = await apiResponse.json();

      expect(json.order.length, "Posts found").toBeGreaterThanOrEqual(1);
      let posts: any[] = Object.values(json.posts);
      let thePost = posts.find((post) => {
        return post.message.includes(hackerPhrase);
      });
      expect(
        thePost,
        `Post not found with message ${hackerPhrase} in channel ${roomName}`
      ).toBeDefined();

      return 1;
    });
  });
});
