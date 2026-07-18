export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
    user?: {
      _id: string;
      role: string;
      name: string;
      email: string;
    };
  };
}

export interface LogoutResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
}
