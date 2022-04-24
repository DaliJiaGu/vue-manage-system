import { RouteRecordRaw } from 'vue-router';
import { breadCrumbType } from '@/base-ui/Breadcrumb';

let firstMenu: any = null;
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  // 1.先拿到所有的功能权限设置的路由
  const allRoutes: RouteRecordRaw[] = [];
  // 这个方法是webpack的全局方法，可以用于读取指定类型文件的所有文件路径
  const routeFiles = require.context('../router/main', true, /\.ts/);
  routeFiles.keys().forEach((key) => {
    // 使用Required函数相当于执行一下对应的文件，那么route拿到的就是对应导出的模块
    const route = require('../router/main' + key.split('.')[1]);
    allRoutes.push(route.default);
  });

  // 2.获取对应角色的权限路由
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // 如果是1就是二级菜单，要递归调用
      if (menu.type === 1) {
        _recurseGetRoute(menu.children);
      } else if (menu.type === 2) {
        const route = allRoutes.find((route) => menu.url === route.path);
        if (route) {
          routes.push(route);
        }

        if (!firstMenu) {
          firstMenu = menu;
        }
      }
    }
  };

  _recurseGetRoute(userMenus);
  return routes;
}

export function mapPathToBreadcrumb(
  userMenus: any[],
  currentPath: string
): any {
  const breadCrumb: breadCrumbType[] = [];
  _mapMenuToDefalutPath(userMenus, currentPath, breadCrumb);
  return breadCrumb;
}

export function _mapMenuToDefalutPath(
  userMenus: any[],
  currentPath: string,
  breadCrumb?: breadCrumbType[]
): any {
  // 1，遍历当前菜单的所有路径，找到与传入的currentPath相同的那个菜单
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = _mapMenuToDefalutPath(menu.children ?? [], currentPath);
      if (findMenu) {
        breadCrumb?.push({ name: menu.name });
        breadCrumb?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export function mapMenuToPermission(userMenu: any[]) {
  const permission: string[] = [];

  function _recurseGetPermission(menu: any[]) {
    for (const item of menu) {
      if (item.type === 1 || item.type === 2) {
        _recurseGetPermission(item.children ?? []);
      } else if (item.type === 3) {
        permission.push(item.permission);
      }
    }
  }
  _recurseGetPermission(userMenu);
  return permission;
}

// 遍历用户的所有menulist权限，并拿到叶节点
export function mapMenuToLeafNode(menuList: any[]) {
  const leafNodes: number[] = [];
  function _recurseGetLeaf(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        _recurseGetLeaf(item.children);
      } else {
        leafNodes.push(item.id);
      }
    }
  }
  _recurseGetLeaf(menuList);
  return leafNodes;
}

export { firstMenu };
