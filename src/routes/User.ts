import express from "express";
import { PrismaClient } from "@prisma/client";
import AuthMiddleware from "../middleware/auth";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();

app.use(AuthMiddleware);
app.get("/get", async (req, res) => {
  const userId = jwt.decode(req.headers.authorization as string) as {
    id: string;
  };
  const user = await prisma.user.findUnique({
    where: {
      user_id: userId.id,
    },
  });
  if (user) {
    res.json({ message: "User Found", user });
    return;
  }
  res.json({ message: "User Not Found" });
});

app.post("/login", async (req, res) => {
  const body = await req.body;
  const checkUser = await prisma.user.findUnique({
    where: {
      phone: body.phone,
    },
  });
  if (checkUser) {
    res.json({
      message: "User Logged In Successfully",
      jwt: jwt.sign(
        { id: checkUser.user_id },
        process.env.JWT_SECRET as string,
      ),
      user: checkUser,
    });
    return;
  }
  const newUser = await prisma.user.create({
    data: {
      phone: body.phone,
    },
  });
  res.json({
    message: "New User Created Successfully",
    jwt: jwt.sign({ id: newUser.user_id }, process.env.JWT_SECRET as string),
  });
});

export default app;
