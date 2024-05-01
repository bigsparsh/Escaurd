import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get("/user", async (req, res) => {
  res.json(await prisma.user.findMany());
});

export default app;
