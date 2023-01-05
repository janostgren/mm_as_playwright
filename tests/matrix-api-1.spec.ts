import { test, expect, APIRequestContext } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Matrix - API Send message", () => {
  let apiContext: APIRequestContext;
  
  test.beforeAll(async ({ playwright }) => {
    const bearer:string='Bearer '+ 'MDAxN2xvY2F0aW9uIGxvY2FsaG9zdAowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjZjaWQgdXNlcl9pZCA9IEBtYXRyaXhfYjpsb2NhbGhvc3QKMDAxNmNpZCB0eXBlID0gYWNjZXNzCjAwMjFjaWQgbm9uY2UgPSBBYl9hbWthI0daSzgtfjdICjAwMmZzaWduYXR1cmUgOReBLkPURCMNtzORS9fpogQqVa3IWN9ZEu5gXW91QTMK'  
    apiContext = await playwright.request.newContext({
      // All requests we send go to this API endpoint.
      baseURL: "http://localhost:8008",
      extraHTTPHeaders: {
        // We set this header per GitHub guidelines.
        //'Accept': 'application/vnd.github.v3+json',
        // Add authorization token to all requests.
        // Assuming personal access token available in the environment.
        'Authorization':bearer
       
      },
    });
  });

  test("Get versions", async ({}) => {
    const versions = await apiContext.get(`/_matrix/client/versions`, {});

    expect(versions.ok()).toBeTruthy();
    let json = await versions.json();
    console.log(json)
  });

  test("Get Public Rooms", async ({}) => {
    const rooms = await apiContext.get(`/_matrix/client/r0/publicRooms`, {});
    let t = rooms.statusText();
    expect(rooms.ok()).toBeTruthy();
    let json = await rooms.json();
    console.log(json)
  });

  test("Send messages", async ({}) => {
    let apiResponse: any;
    let roomAlias = encodeURIComponent("#town-square:localhost");
    let roomId;
    await test.step("Get the room", async () => {
      let path = `/_matrix/client/r0/directory/room/${roomAlias}`;
      apiResponse = await apiContext.get(`${path}`, {});
      expect(apiResponse.ok()).toBeTruthy();
      let json = await apiResponse.json();
      roomId = json.room_id;
      expect(roomId).not.toBeUndefined();
    });

    await test.step("Send Text Message", async () => {
      const transactionId = Date.now();
    
      let p = `/_matrix/client/r0/rooms/${roomId}/send/m.room.message/${transactionId}`;
      apiResponse = await apiContext.put(p, {
          data: {
            "body": faker.hacker.phrase(),
            "msgtype": "m.text"
          }
      });
      let statusText=apiResponse.statusText()
      expect(apiResponse.ok()).toBeTruthy();
      let json = await apiResponse.json();
    });
  });
});
