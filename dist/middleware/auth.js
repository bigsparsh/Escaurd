"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        jsonwebtoken_1.default.verify(authHeader, process.env.JWT_SECRET);
        next();
        return;
    }
    catch (err) {
        res.status(401).json({
            message: "Unauthorized Access to the API",
        });
        return;
    }
};
exports.default = AuthMiddleware;
