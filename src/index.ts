import express from "express";
import OrderRouter from "./routes/Order";
import UserRouter from "./routes/User";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/v1/order", OrderRouter);
app.use("/api/v1/user", UserRouter);

app.listen(port);

export default app;
