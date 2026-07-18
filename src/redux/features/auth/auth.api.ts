import type {
  LoginCredentials,
  LoginResponse,
  LogoutResponse,
} from '@/interfaces/auth.interface';
import { baseApi } from '@/redux/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: '/auth/login',
        method: 'POST',
        data: credentials,
      }),
      invalidatesTags: ['AUTH'],
    }),

    getMe: builder.query({
      query: () => ({
        url: '/auth/getme',
        method: 'GET',
      }),
      providesTags: ['AUTH'],
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['AUTH'],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useLogoutMutation } = authApi;
