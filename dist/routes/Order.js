"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../middleware/auth"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(auth_1.default);
app.get("/get", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        orders: yield prisma.order.findMany(),
    });
}));
app.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    const user = jsonwebtoken_1.default.decode(req.query.jwt);
    const newOrder = yield prisma.order.create({
        data: {
            user_id: user.id,
            price: body.price,
        },
    });
    yield prisma.orderContent.createMany({
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
}));
exports.default = app;
