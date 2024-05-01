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
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(auth_1.default);
app.get("/get", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        users: yield prisma.user.findMany(),
    });
}));
app.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    const newUser = yield prisma.user.create({
        data: {
            phone: body.phone,
        },
    });
    res.json({
        message: "User created successfully",
        user: newUser,
    });
}));
exports.default = app;
