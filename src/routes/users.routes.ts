//Routes express.js to menu controller
import UsersController from "@/controllers/users.controller";
import { isAuthenticated } from "@/middlewares";
import { isValidID } from "@/middlewares/idValidation";
import { Router } from "express";

const baseRoute = "users";
export const router = Router();

//Routes express.js to menu controller
router.get("/:id", isAuthenticated, isValidID, UsersController.getUser);
router.get("/", isAuthenticated, UsersController.getAllUsers);
router.post("/", isAuthenticated, UsersController.createUser);

router.delete("/:id", isAuthenticated, isValidID, UsersController.deleteUser);
router.put("/:id", isAuthenticated, isValidID, UsersController.updateUser);

router.post("/menus", isAuthenticated, UsersController.associateMenusToUser);
router.get(
  "/:id/menus",
  isAuthenticated,
  isValidID,
  UsersController.getMenuByUser
);
