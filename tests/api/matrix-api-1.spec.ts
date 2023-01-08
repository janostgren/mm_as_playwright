import { expect, APIRequestContext } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { test } from "../../lib/fixtures/apiProfilesFixture";
import { MatrixApiClient } from "../../lib/apiModels/matrixApiClient";

test.describe("Matrix - API Send message", () => {
  let matrixContext: APIRequestContext;
  let matrixApiClient: MatrixApiClient;

  test.beforeAll(async ({ playwright, matrix_a }) => {
    matrixApiClient = new MatrixApiClient(matrix_a, playwright.request);
    matrixContext = await matrixApiClient.authenticate();
  })
  

  test("Send Text message", async ({}) => {
    let publicRooms = await test.step("Get Public rooms", async () => {
      const rooms = await matrixContext.get(
        `/_matrix/client/r0/publicRooms`,
        {}
      );
      let t = rooms.statusText();
      expect(rooms.ok()).toBeTruthy();
      let json = await rooms.json();
      console.log(json);
      return json.chunk;
    });

    await test.step("Get the room", async () => {
      let domain = matrixApiClient.getDomain();
      let roomAlias = encodeURIComponent(`#town-square:${domain}`);

      let p = `/_matrix/client/r0/directory/room/${roomAlias}`;
      let apiResponse = await matrixContext.get(p, {});
      expect(apiResponse.ok()).toBeTruthy();
      let json = await apiResponse.json();
      let roomId = json.room_id;
      expect(roomId).not.toBeUndefined();
    });

    await test.step("Send Text Message", async () => {
      const transactionId = "m." + Date.now();
      let message = `**Strange message seen:** \n${faker.hacker.phrase()}\n from ${faker.internet.email()}`;

      let p = `/_matrix/client/r0/rooms/${roomId}/send/m.room.message/${transactionId}`;
      let apiResponse = await matrixContext.put(p, {
        data: {
          body: message,
          msgtype: "m.text",
        },
      });
      let statusText = apiResponse.statusText();
      expect(apiResponse.ok()).toBeTruthy();
      let json = await apiResponse.json();
    });
  });

