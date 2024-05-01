import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get("/get", async (_, res) => {
  res.json({
    orders: await prisma.order.findMany(),
  });
});

export default app;
