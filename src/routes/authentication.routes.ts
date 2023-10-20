import AuthenticationController from "@/controllers/authentication.controller";
import { isAuthenticated } from "@/middlewares";
import { Router } from "express";

export const router = Router();

//Routes express.js to menu controller
router.post("/login", AuthenticationController.login);
router.get("/me", isAuthenticated, AuthenticationController.me);
