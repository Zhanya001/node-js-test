// Extends the Express Request type to include a user object
declare namespace Express {
  interface Request {
    user: {
      id: string;
    };
    id: number;
  }
}
