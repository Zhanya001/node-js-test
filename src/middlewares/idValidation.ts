import { RequestHandler } from "express";

export const isValidID: RequestHandler = (req, res, next) => {
  const { id: id_ } = req.params;
  const id = Number(id_);
  if (isNaN(id)) return res.status(400).json({ message: "ID is not valid" });
  req.id = id;
  next();
};
