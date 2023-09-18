import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import authRouter from "../../routes/auth.routes.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

describe("Properly testing Auth Routes endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });

    expect(res.status).toBe(200);
    expect(res.body).toBe("User has been created.");
  });

  it("should logout a user", async () => {
    const res = await request(app).post("/auth/logout");

    expect(res.status).toBe(200);
    expect(res.body).toBe("User has been logged out.");
  });
});
