export const Role = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
} as const;

export type TRole = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  photoUrl?: string;
  phone?: string;
  status: boolean;
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
