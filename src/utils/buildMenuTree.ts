import { FullMenu, Menu } from "@/models";

//
export const buildMenuTree = (
  menus: FullMenu[],
  parentId?: number | null
): FullMenu[] => {
  const result = [];
  for (const menu of menus) {
    if (menu.parentId === parentId) {
      menu.children = buildMenuTree(menus, menu.id);
      result.push(menu);
    }
  }
  return result;
};
