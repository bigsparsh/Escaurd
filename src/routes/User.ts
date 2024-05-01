import express from "express";
import { PrismaClient } from "@prisma/client";
import AuthMiddleware from "../middleware/auth";

const app = express();
const prisma = new PrismaClient();

app.use(AuthMiddleware);
app.get("/get", async (_, res) => {
  res.json({
    users: await prisma.user.findMany(),
  });
});

app.post("/create", async (req, res) => {
  const body = await req.body;
  const newUser = await prisma.user.create({
    data: {
      phone: body.phone,
    },
  });
  res.json({
    message: "User created successfully",
    user: newUser,
  });
});

export default app;
