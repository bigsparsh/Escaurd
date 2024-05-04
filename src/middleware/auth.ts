import jwt, { Secret } from "jsonwebtoken";
import express from "express";

const AuthMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.headers.authorization;
  try {
    jwt.verify(authHeader as string, process.env.JWT_SECRET as Secret);
    next();
    return;
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized Access to the API",
    });
    return;
  }
};
export default AuthMiddleware;
