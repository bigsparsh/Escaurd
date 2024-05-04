import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { OrderCreate } from "../types/Order";
import AuthMiddleware from "../middleware/auth";

const app = express();
const prisma = new PrismaClient();

app.use(AuthMiddleware);
app.get("/get", async (req, res) => {
  const user = jwt.decode(req.headers.authorization as string) as {
    id: string;
  };
  console.log("user: " + user);

  const orders = await prisma.order.findMany({
    where: {
      user_id: user.id,
    },
  });
  if (orders.length) {
    res.json({ message: "Orders Found", orders });
    return;
  }
  res.json({ message: "Orders Not Found" });
});

app.post("/create", async (req, res) => {
  const body: OrderCreate = await req.body;
  const user = jwt.decode(req.headers.authorization as string) as {
    id: string;
  };
  const newOrder = await prisma.order.create({
    data: {
      user_id: user.id,
      price: body.price,
    },
  });
  await prisma.orderContent.createMany({
    data: body.guards.map((guard) => ({
      order_id: newOrder.order_id,
      guard_count: guard.count,
      with_weapon: guard.with_weapon,
      with_car: guard.with_car,
      with_bike: guard.with_bike,
    })),
  });
  res.json({
    message: "Order created successfully",
    order: newOrder,
  });
});

export default app;
