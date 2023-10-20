import { Server } from "http";
import { bootstrap } from "../../server";
import request from "supertest";

// Test the login endpoint
describe("Successfully login", () => {
  let authToken: string | undefined;
  const { app, server } = bootstrap("4003");
  it("should return status 200", async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "admin",
      password: "admin",
    });
    console.log(response.body, response.status);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    if (response.body.token) authToken = response.body.token;
  });
  it("should return status 401", async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "admin",
      password: "wrongpassword",
    });
    expect(response.status).toBe(401);
  });

  it("should return status 200", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });
  //Kill the server
  afterAll(() => {
    server.close();
  });
});
