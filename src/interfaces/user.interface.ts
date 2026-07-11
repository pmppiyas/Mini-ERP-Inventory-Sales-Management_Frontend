export const Role = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
} as const;

export type TRole = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export const TPermission = {
  PERMISSION_GIVER: 'PERMISSION_GIVER',

  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  VIEW_PRODUCT: 'VIEW_PRODUCT',

  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  VIEW_USER: 'VIEW_USER',
} as const;

export type TPermission = (typeof TPermission)[keyof typeof TPermission];

export const Status = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCK: 'BLOCK',
} as const;

export type IStatus = (typeof Status)[keyof typeof Status];

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  photoUrl?: string;
  phone?: string;
  status: IStatus;
  permissions: TPermission[];
  createdAt: string;
  updatedAt: string;
}

export interface IUserQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
  sort?: string;
}

export interface IUserMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IUsersResult {
  users: IUser[];
  meta: IUserMeta;
}

export interface IUsersResponse {
  data: IUsersResult;
}

export interface IUserResponse {
  data: IUser;
}
