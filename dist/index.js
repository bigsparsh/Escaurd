"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = __importDefault(require("./routes/Order"));
const User_1 = __importDefault(require("./routes/User"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/api/v1/order", Order_1.default);
app.use("/api/v1/user", User_1.default);
app.listen(port);
