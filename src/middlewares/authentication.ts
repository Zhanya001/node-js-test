// Import the necessary types Request , Response and NextFunction
import { verifyJwt } from "@/utils/jwt";
import type { Request, Response, NextFunction } from "express";

//Middleware to check if the user is authenticated or not with the help of the token and the secret key using jsonwebtoken librar
const Unauthorized = (res: Response) =>
  res.status(401).json({ message: "Unauthorized" });
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the request header
  const token = req.headers.authorization?.split?.(" ")?.[1];
  // Get the secret key from the environment variable
  // If the token is not present in the request header return Unauthorized
  if (!token) return Unauthorized(res);
  // Verify the token with the secret key
  try {
    if (!(await verifyJwt(token))) return Unauthorized(res);
    // If the token is verified successfully, set the user in the request object
    // Call the next middleware

    //@ts-ignore
    req.user = await verifyJwt(token);
    next();
  } catch (error) {
    // If the token is not verified successfully return Unauthorized
    return Unauthorized(res);
  }
};
