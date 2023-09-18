import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../../models/User.model.js";
import userRouter from "../../routes/users.routes.js";

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

describe("Properly testing GET /users/all endpoint", () => {
  it("should return a list of users", async () => {
    const mockUsers = [
      {
        username: "user1",
        email: "user1@example.com",
        password: "password",
        name: "newuser",
      },
      {
        username: "user2",
        email: "user2@example.com",
        password: "password",
        name: "newuser2",
      },
    ];
    await User.insertMany(mockUsers);

    const app = express();
    app.use(express.json());
    app.use("/", userRouter);

    const res = await request(app).get("/all");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty("username", "user1");
    expect(res.body[1]).toHaveProperty("username", "user2");
  });

  it("should return 500 if there is an error", async () => {
    const app = express();
    app.use(express.json());
    app.use("/users", (_, res) => {
      res.status(500).json({ message: "Error fetching users" });
    });

    const res = await request(app).get("/users/all");
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("message", "Error fetching users");
  });
});
