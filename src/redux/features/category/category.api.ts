import type {
  ICategory,
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
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
