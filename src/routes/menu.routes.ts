//Routes express.js to menu controller
import MenuController from "@/controllers/menu.controller";
import { isValidID } from "@/middlewares/idValidation";
import { Router } from "express";
import { isAuthenticated } from "middlewares";

export const router = Router();
//Routes express.js to menu controller
router.get(`/:id`, isAuthenticated, isValidID, MenuController.getMenu);
router.get("/", isAuthenticated, MenuController.getAllMenus);
router.post("/", isAuthenticated, MenuController.createMenu);
router.delete("/:id", isAuthenticated, isValidID, MenuController.deleteMenu);
router.put("/:id", isAuthenticated, isValidID, MenuController.updateMenu);
