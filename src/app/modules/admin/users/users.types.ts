import { RoleInterface } from '../roles/roles.types';

export type UserInterface = {
  id?: number;
  name: string;
  email: string;
  password?: string;
  roleId: number;
  role?: RoleInterface;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type UserFilterInterface = {
  name?: string;
};
