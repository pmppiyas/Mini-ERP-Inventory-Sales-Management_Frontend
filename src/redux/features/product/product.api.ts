import type {
  IProduct,
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
      transformResponse: (response: IProductResponse) => {
        return {
          products: response.data.products,
          meta: response.data.meta,
        };
      },
      providesTags: ['PRODUCT'],
    }),

    getProductById: builder.query<IProduct, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
      providesTags: (_result, _err, id) => [{ type: 'PRODUCT', id }],
    }),

    addProduct: builder.mutation<IProduct, FormData>({
      query: (formData) => ({
        url: '/product/add',
        method: 'POST',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      invalidatesTags: ['PRODUCT'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
} = productApi;
