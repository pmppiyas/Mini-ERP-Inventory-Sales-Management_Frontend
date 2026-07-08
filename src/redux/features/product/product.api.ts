import type {
  IProductResponse,
  IProductsResult,
  ProductQueryParams,
} from '@/interfaces/product.interface';
import { baseApi } from '@/redux/baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProductsResult, ProductQueryParams>({
      query: (params) => ({
        url: '/product',
        method: 'GET',
        params,
      }),
      transformResponse: (response: IProductResponse) => ({
        products: response.data.products,
        meta: response.data.meta,
      }),
      providesTags: ['PRODUCT'],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
