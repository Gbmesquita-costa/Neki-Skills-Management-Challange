import { test, expect, describe } from "vitest";

import request from "supertest";
import { app } from "@/http";

import { createAuthenticateUser } from "utils/tests/create-authenticate-user";

describe("Get user profile (E2E)", () => {
  test("should be able to get user profile", async () => {
    const { token } = await createAuthenticateUser(app);
    const userProfileResponse = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(userProfileResponse.statusCode).toEqual(200);
    expect(userProfileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "neki@gmail.com",
      }),
    );
  });
});
