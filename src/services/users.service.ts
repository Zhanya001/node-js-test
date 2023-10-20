import { CommonService } from "@/types";
import { prisma } from "config";
import { FullUser, Menu, User } from "models";
import type { MenusToUser } from "@prisma/client";
// Get the type of the service from the CommonService interface and the User model
type Service = CommonService<User, FullUser>;

const create: Service["create"] = async ({
  email,
  lastname,
  name,
  password,
  username,
}) => {
  // Create User in DB with ORM Prisma
  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase().trim(),
      lastname,
      name,
      password,
      username: username.toLowerCase().trim(),
      status: 1,
    },
  });

  return user as User;
};

const delete_: Service["delete"] = async id => {
  // Making an logic delete of a user in DB with ORM Prisma
  const user = await prisma.user.update({
    where: { id, status: 1 },
    data: { status: 0 },
  });
  return user as User;
};

const update: Service["update"] = async (id, payload) => {
  const user = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return user as User;
};

const get: Service["get"] = async (id, status = 1) => {
  //Get the user by id in DB with ORM Prisma
  const user = await prisma.user.findUnique({
    where: { id, status },
    select: {
      id: true,
      name: true,
      lastname: true,
      username: true,
      email: true,
    },
  });
  return user as FullUser;
};

const getUserByField = async <T extends keyof User>(
  field: T,
  value: User[T]
) => {
  //Get the user by field and his value in DB with ORM Prisma
  const user = await prisma.user.findUnique({
    // @ts-ignore
    where: { [field]: value },
  });
  return user;
};

const getUserByEmailOrUsername = async ({
  email,
  username,
}: {
  email?: string;
  username?: string;
}) => {
  // Get the user by email or username in DB with ORM Prisma
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        email ? { email: email.toLowerCase?.() } : {},
        username ? { username: username.toLowerCase?.() } : {},
      ],
    },
  });
  return user as User;
};

// Not pagination yet and not filtering
const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: { status: 1 },
    select: {
      id: true,
      name: true,
      lastname: true,
      username: true,
      email: true,
    },
  });
  return users as FullUser[];
};

const getAllUsersWithFilter = async (filter: string, status = 1) => {
  //Get all users with filter in DB with ORM Prisma , filter by name, lastname, username and email and sorted by username
  const users = await prisma.user.findMany({
    where: {
      status,
      OR: [
        { name: { contains: filter } },
        { lastname: { contains: filter } },
        { username: { contains: filter } },
        { email: { contains: filter } },
      ],
    },
    select: {
      id: true,
      name: true,
      lastname: true,
      username: true,
      email: true,
    },
    //Sort by username
    orderBy: { username: "asc" },
  });
  return users as User[];
};

const getAllMenusByUserId = async (id: number, filter?: string, status = 1) => {
  //Get all menus by user id in DB with ORM Prisma
  const menus = await prisma.user
    .findUnique({
      where: { id, status },
      select: { menusToUser: { select: { menu: true } } },
    })
    .then(user => user?.menusToUser.map(menu => menu.menu));
  if (!menus) throw new Error("Menus not found");

  const filteredMenus = filter
    ? menus.filter(menu => menu.name.includes(filter))
    : menus;
  //Get all menus with the ids of the menusToUser
  return filteredMenus as Menu[];
};

const associateMenusToUser = async (
  id: number,
  newMenuIds: number[],
  status = 1
) => {
  // First, get all menus currently associated with the user
  const currentMenus = await prisma.user
    .findUnique({
      where: { id },
      select: { menusToUser: { select: { menuId: true } } },
    })
    .then(user => user?.menusToUser.map(menu => menu.menuId));

  if (!currentMenus) throw new Error("User not found");

  // Calculate the menus you need to add and remove
  const menusToAdd = newMenuIds.filter(menu => !currentMenus.includes(menu));
  const menusToRemove = currentMenus.filter(menu => !newMenuIds.includes(menu));

  // Prepare delete and create operations
  const deleteOperations = prisma.menusToUser.deleteMany({
    where: {
      AND: [
        { userId: id },
        {
          menuId: {
            in: menusToRemove,
          },
        },
      ],
    },
  });

  const createOperations = prisma.menusToUser.createMany({
    data: menusToAdd.map(menuId => ({
      menuId,
      userId: id,
    })),
  });

  // Perform the operations in an atomic transaction
  await prisma.$transaction([deleteOperations, createOperations]);

  // You can return some information if you need to
  return { added: menusToAdd, removed: menusToRemove };
};

//Singleton pattern to export the service object
const UsersService = Object.freeze({
  create,
  delete: delete_,
  update,
  get,
  getUserByField,
  getUserByEmailOrUsername,
  getAllUsers,
  getAllMenusByUserId,
  associateMenusToUser,
  getAllUsersWithFilter,
} as const);
export default UsersService;
