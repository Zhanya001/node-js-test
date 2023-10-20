import { ErrorHandler } from "@/types";

export class AuthenticationError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

export const errorHandler: ErrorHandler = (err, _req, res, _next) => {
  if (err instanceof AuthenticationError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err.stack);
  res.status(500).send("Internal Server Error");
};
