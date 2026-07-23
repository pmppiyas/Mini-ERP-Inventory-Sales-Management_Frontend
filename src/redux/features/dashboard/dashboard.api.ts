import type {
  IDashboardData,
  IDashboardResponse,
} from '@/interfaces/dashboard.interface';
import { baseApi } from '@/redux/baseApi';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardMeta: builder.query<IDashboardData, void>({
      query: () => ({
        url: '/meta',
        method: 'GET',
      }),
      transformResponse: (response: IDashboardResponse) => response.data,
      providesTags: ['DASHBOARD'],
    }),
  }),
});

export const { useGetDashboardMetaQuery } = dashboardApi;
