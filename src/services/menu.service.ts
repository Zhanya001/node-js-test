import { FullMenu, Menu } from "@/models";
import { CommonService } from "@/types";
import { buildMenuTree } from "@/utils/buildMenuTree";
import { prisma } from "config";

type Service = CommonService<Menu, FullMenu>;
const create: Service["create"] = async payload => {
  //Create Menu in database with Prisma ORM
  const menu = await prisma.menu.create({
    data: Object.assign(payload, { status: 1 }),
  });
  return menu as Menu;
};

const delete_: Service["delete"] = async id => {
  const menu = await prisma.menu.update({
    where: { id },
    data: { status: 0 },
  });
  return menu as Menu;
};

const update: Service["update"] = async (id, payload) => {
  const menu = await prisma.menu.update({
    where: { id },
    data: payload,
  });
  return menu as Menu;
};

const get: Service["get"] = async (id, status = 1) => {
  //Get the menu by id in database with ORM Prisma with its parent
  const menu = await prisma.menu.findUnique({
    where: { id, status },
    select: {
      name: true,
      id: true,
      parent: true,
      parentId: true,
      children: true,
    },
  });

  return menu as FullMenu;
};

const getAll: Service["getAll"] = async (status = 1) => {
  const menus = await prisma.menu.findMany({
    where: { status },
    select: {
      name: true,
      id: true,
      parent: true,
      parentId: true,
      status: true,
    },
    orderBy: { parentId: "asc" },
  });
  return buildMenuTree(menus as FullMenu[], null) as FullMenu[];
};

const getAllWithFilter = async (filter: string, status = 1) => {
  //Get all menus with filter in the name with ORM Prisma and sort by parent null first
  const menus = await prisma.menu.findMany({
    where: { name: { contains: filter }, status },
    orderBy: { parentId: "asc" },
  });
  return menus as Menu[];
};

export const getMenuByName = async (name: string) => {
  const menu = await prisma.menu.findUnique({ where: { name } });
  return menu as Menu;
};

//GetListMenusByIds in prisma
export const getListMenusByIds = async (ids: number[]) => {
  const menus = await prisma.menu.findMany({
    where: { id: { in: ids }, status: 1, parentId: null },
  });
  return menus as Menu[];
};

//Singleton pattern
const MenuService = Object.freeze({
  create,
  delete: delete_,
  update,
  get,
  getAll,
  getAllWithFilter,
  getMenuByName,
  getListMenusByIds,
});

export default MenuService;
