import type {
  IUser,
  IUserQueryParams,
  IUsersResponse,
  IUsersResult,
  IUserResponse,
  IAddUserPayload,
} from '@/interfaces/user.interface';
import { baseApi } from '@/redux/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation<IUser, IAddUserPayload>({
      query: (data) => ({
        url: '/user/register',
        method: 'POST',
        data,
      }),
      transformResponse: (response: IUserResponse) => response.data,
      invalidatesTags: ['USER'],
    }),

    updateUser: builder.mutation<IUser, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        data,
      }),
      transformResponse: (response: IUserResponse) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        'USER',
        { type: 'USER', id },
      ],
    }),

    getUsers: builder.query<IUsersResult, IUserQueryParams>({
      query: (params) => ({
        url: '/user',
        method: 'GET',
        params,
      }),
      transformResponse: (response: IUsersResponse) => response.data,
      providesTags: ['USER'],
    }),

    getUserById: builder.query<IUser, string>({
      query: (id) => ({ url: `/user/${id}`, method: 'GET' }),
      transformResponse: (response: IUserResponse) => response.data,
      providesTags: (_r, _e, id) => [{ type: 'USER', id }],
    }),

    updateUserRole: builder.mutation<IUser, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/user/${id}/role`,
        method: 'PATCH',
        data: { role },
      }),
      invalidatesTags: (_r, _e, { id }) => ['USER', { type: 'USER', id }],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/user/${id}`, method: 'DELETE' }),
      invalidatesTags: ['USER'],
    }),
  }),
});

export const {
  useAddUserMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
