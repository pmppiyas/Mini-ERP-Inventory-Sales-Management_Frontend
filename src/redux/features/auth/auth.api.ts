import type {
  LoginCredentials,
  LoginResponse,
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
  }),
});

export const { useLoginMutation } = authApi;
