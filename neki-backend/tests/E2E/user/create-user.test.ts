import { test, expect, describe } from "vitest";

import request from "supertest";
import { app } from "@/http";

describe("Create user (E2E)", () => {
  test("should be able to register", async () => {
    const response = await request(app).post("/user").send({
      email: "neki@gmail.com",
      password: "1234567",
    });

    expect(response.statusCode).toEqual(201);
  });
});
