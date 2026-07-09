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
      }),
      invalidatesTags: ['PRODUCT'],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PRODUCT'],
    }),

    updateProduct: builder.mutation<
      IProduct,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/product/${id}`,
        method: 'PATCH',
        data: formData,
      }),
      invalidatesTags: (_result, _err, { id }) => [
        'PRODUCT',
        { type: 'PRODUCT', id },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
