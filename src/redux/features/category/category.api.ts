import type {
  ICategory,
  ICategoryPayload,
  ICategoryResponse,
} from '@/interfaces/category.interface';
import { baseApi } from '@/redux/baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: '/category/all',
        method: 'GET',
      }),
      transformResponse: (response: ICategoryResponse) => response.data,
      providesTags: ['CATEGORY'],
    }),

    addCategory: builder.mutation<ICategory, ICategoryPayload>({
      query: (data) => ({
        url: 'category/create',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['CATEGORY'],
    }),

    updateCategory: builder.mutation<ICategory, ICategoryPayload>({
      query: (data) => ({
        url: '/category',
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['CATEGORY'],
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CATEGORY'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
