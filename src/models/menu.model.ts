import type { User } from "./user.model";
import type {
  Menu as MenuPrisma,
  MenusToUser as MenusToUserPrisma,
} from "@prisma/client";

export interface Menu extends MenuPrisma {
  status: 0 | 1;
}

export interface FullMenu extends Menu {
  parent?: Menu | null;
  children?: Menu[];
}

export type MenustoUser = MenusToUserPrisma;
