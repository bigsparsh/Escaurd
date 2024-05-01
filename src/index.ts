import express from "express";
import BodyGuardRouter from "./routes/BodyGuard";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/", BodyGuardRouter);

app.listen(port);
