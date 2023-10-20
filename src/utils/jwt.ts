import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "config";

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  return jwt.sign(payload, config.JWT_SECRET_KEY, options);
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    return jwt.verify(token, config.JWT_SECRET_KEY) as T;
  } catch (error) {
    return null;
  }
};
