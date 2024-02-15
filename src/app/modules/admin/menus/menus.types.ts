import { ActionInterface } from '../actions/actions.types';
import { MenuGroupInterface } from '../menus-groups/menus-groups.types';

export type MenuInterface = {
  id?: number;
  name: string;
  route: string;
  menuKey: string;
  icon: string;
  menuGroupId?: number;
  menuGroup?: MenuGroupInterface;
  actionsMenus?: any;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type MenuFilterInterface = {
  name?: string;
};

export type MenuActionInterface = {
  id: number;
  actionId: number;
  menuId: number;
  action: ActionInterface;
  privileges: PrivilegeInterface[];
};

export type PrivilegeInterface = {
  roleId?: number;
  actionMenuId?: number;
  key?: string[];
};
