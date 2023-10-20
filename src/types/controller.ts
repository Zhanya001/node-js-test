import type { NextFunction, Request, RequestHandler, Response } from "express";

export type ErrorHandler = <T extends Error>(
  e: T,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
