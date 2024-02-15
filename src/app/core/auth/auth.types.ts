import { CompanyInterface } from 'app/modules/companies/companies.types';

export type LoginResponseInterface = {
  accessToken: string;
  user: UserJWTInterface;
};

export type LoginBodyInterface = {
  email: string;
  password: string;
};

export type ForgotPasswordResponseInterface = {
  message: string;
};

export type ForgotPasswordBodyInterface = {
  email: string;
};

export type ResetPasswordResponseInterface = {
  message: string;
};

export type ResetPasswordBodyInterface = {
  password: string;
  confirmPassword: string;
};

export type UserJWTInterface = {
  id: string;
  name: string;
  email: string;
  companyId: number;
  company: CompanyInterface;
  roleId: number;
  role?: RoleInterface;
  menus?: MenuInterface[];
  privileges?: Array<{ key: string }>;
  createdAt: Date;
};

export type RoleInterface = {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type MenuInterface = {
  menu: string;
  icon: string;
  route: string;
  menuKey: string;
};

export interface NotificationInAppInterface {
  id?: number;
  name: string;
  subtitle: string;
  icon: string;
  metadata?: NotificationInAppMetadataInterface[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface NotificationInAppMetadataInterface {
  id?: number;
  userId: number;
  user?: UserJWTInterface;
  notificationId: number;
  notification?: NotificationInAppInterface;
  isRead: boolean;
}
