import { test, expect, describe } from "vitest";

import request from "supertest";
import { app } from "@/http";

describe("Authenticate user (E2E)", () => {
  test("should be able to authenticate", async () => {
    await request(app).post("/user").send({
      email: "neki@gmail.com",
      password: "1234567",
    });

    const response = await request(app).post("/session").send({
      email: "neki@gmail.com",
      password: "1234567",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      message: expect.any(String),
      token: expect.any(String),
    });
  });
});
