import MenuService from "@/services/menu.service";
import zod from "zod";
import type { RequestHandler } from "express";

const getMenu: RequestHandler = async (req, res) => {
  const { id } = req;
  //get menu from database
  try {
    const menu = await MenuService.get(id);
    if (!menu)
      return res.status(404).send({
        message: "Menu not found",
      });
    return res.status(200).send({ data: menu, message: "Menu found" });
  } catch (error) {
    return res.status(500).send({
      message: "Error while getting menu",
    });
  }
};

const getAllMenus: RequestHandler = async (req, res) => {
  //Get Params filter
  const { filter } = req.query;
  if (typeof filter !== "string" && filter !== undefined)
    return res.status(400).send({
      message: "Filter must be string",
    });
  try {
    const menus = await (filter
      ? MenuService.getAllWithFilter(filter)
      : MenuService.getAll());
    return res.status(200).send({ message: "Menus found", data: menus });
  } catch (error) {
    return res.status(500).send({
      message: "Error while getting menus",
    });
  }
};
const nameSchema = zod
  .string({ required_error: "Name is required" })
  .trim()
  .min(4)
  .max(20);

const createMenu: RequestHandler = async (req, res) => {
  let {
    name,
    parentId,
  }: { name: string | undefined; parentId: number | undefined } = req.body;

  try {
    name = nameSchema.parse(name);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res
        .status(400)
        .json({ message: error.errors?.[0]?.message || "Server Error" });
    } else {
      return res.status(400).json({ message: "Server Error" });
    }
  }

  try {
    //check if the menu exists  in database
    const menuExists = await MenuService.getMenuByName(name);
    if (menuExists)
      return res.status(400).send({
        message: "Menu already exists",
      });

    const parent = Number(parentId);

    const payload: { name: string; parentId: null | number } = {
      name,
      parentId: null,
    };
    if (!isNaN(parent)) {
      const existParent = await MenuService.get(parent);
      if (existParent) payload.parentId = parent;
    }
    //create menu in database
    const menu = await MenuService.create(payload);
    return res.status(201).send(menu);
  } catch (error) {
    return res.status(500).send({
      message: "Error while creating menu",
    });
  }
};

const deleteMenu: RequestHandler = async (req, res) => {
  const { id } = req;
  try {
    //check if the menu exists  in database
    const menu = await MenuService.get(id);
    if (!menu)
      return res.status(404).send({
        message: "Menu not found",
      });

    // Check if the menu has children
    if (menu?.children)
      return res.status(400).send({
        message: "Menu has children and cannot be deleted",
      });

    //delete menu in database
    await MenuService.delete(id);
    return res.status(200).send({ message: "Menu deleted" });
  } catch (error) {
    return res.status(500).send({
      message: "Error while deleting menu",
    });
  }
};

const updateMenu: RequestHandler = async (req, res) => {
  let { name }: { name: string | undefined } = req.body;
  const { id } = req;

  try {
    name = nameSchema.parse(name);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res
        .status(400)
        .json({ message: error.errors?.[0]?.message || "Server Error" });
    } else {
      return res.status(400).json({ message: "Server Error" });
    }
  }

  try {
    //check if the menu exists  in database
    const menuExists = await MenuService.get(id);
    if (!menuExists)
      return res.status(404).send({
        message: "Menu not found",
      });

    const menuExistsByName = await MenuService.getMenuByName(name);
    if (menuExistsByName && menuExistsByName.id !== id)
      return res.status(400).send({
        message: "Menu with this name already exists",
      });

    //update menu in database
    const menu = await MenuService.update(id, { name });
    return res.status(200).send({ data: menu, message: "Menu updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while updating menu",
    });
  }
};

const MenuController = Object.freeze({
  getMenu,
  getAllMenus,
  createMenu,
  deleteMenu,
  updateMenu,
} as const satisfies Record<string, RequestHandler>);

export default MenuController;
