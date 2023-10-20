import type { MenusToUser, User as UserPrisma } from "@prisma/client";
export interface User extends UserPrisma {
  status: 1 | 0;
}

export interface FullUser extends User {
  menusToUser: MenusToUser;
}
