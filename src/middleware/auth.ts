import jwt, { Secret } from "jsonwebtoken";
import express from "express";

const AuthMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    jwt.verify(req.query.jwt as string, process.env.JWT_SECRET as Secret);
    next();
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized Access to the API",
    });
  }
};
export default AuthMiddleware;
