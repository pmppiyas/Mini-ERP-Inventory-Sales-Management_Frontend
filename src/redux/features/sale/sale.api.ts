import type {
  ISale,
  ISaleItem,
  ISaleQueryParams,
  ISaleResponse,
  ISalesResponse,
  ISalesResult,
} from '@/interfaces/sale.interface';
import { baseApi } from '@/redux/baseApi';

export const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query<ISalesResult, ISaleQueryParams>({
      query: (params) => ({
        url: '/sale',
        method: 'GET',
        params,
      }),
      transformResponse: (response: ISalesResponse) => response.data,
      providesTags: ['SALE'],
    }),

    getSaleById: builder.query<ISale, string>({
      query: (id) => ({
        url: `/sale/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ISaleResponse) => response.data,
      providesTags: (_r, _e, id) => [{ type: 'SALE', id }],
    }),

    addSale: builder.mutation<void, ISaleItem[]>({
      query: (items) => ({
        url: '/sale/add',
        method: 'POST',
        data: items,
      }),
      invalidatesTags: ['SALE', 'PRODUCT', 'DASHBOARD'],
    }),

    deleteSale: builder.mutation<void, string>({
      query: (id) => ({
        url: `/sale/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SALE'],
    }),
  }),
});

export const {
  useGetSalesQuery,
  useGetSaleByIdQuery,
  useAddSaleMutation,
  useDeleteSaleMutation,
} = saleApi;
