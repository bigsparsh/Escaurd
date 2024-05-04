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
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../middleware/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(auth_1.default);
app.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = jsonwebtoken_1.default.decode(req.headers.authorization);
    const user = yield prisma.user.findUnique({
        where: {
            user_id: userId.id,
        },
    });
    if (user) {
        res.json({ message: "User Found", user });
        return;
    }
    res.json({ message: "User Not Found" });
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    const checkUser = yield prisma.user.findUnique({
        where: {
            phone: body.phone,
        },
    });
    if (checkUser) {
        res.json({
            message: "User Logged In Successfully",
            jwt: jsonwebtoken_1.default.sign({ id: checkUser.user_id }, process.env.JWT_SECRET),
            user: checkUser,
        });
        return;
    }
    const newUser = yield prisma.user.create({
        data: {
            phone: body.phone,
        },
    });
    res.json({
        message: "New User Created Successfully",
        jwt: jsonwebtoken_1.default.sign({ id: newUser.user_id }, process.env.JWT_SECRET),
    });
}));
exports.default = app;
