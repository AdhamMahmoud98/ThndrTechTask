import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetTickersApiResponse } from './types';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;


export const exploreApi = createApi({
  reducerPath: 'exploreApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTickers: builder.query<GetTickersApiResponse, string | null>({
      query: () => `v3/reference/tickers?active=true&limit=20${apiKey}`,
    }),
    getSearchedTickers: builder.query<GetTickersApiResponse, string | null>({
        query: (query) => `v3/reference/tickers?active=true&limit=20${query}${apiKey}`,
      }),
    getNextPageTickers: builder.query<GetTickersApiResponse, string | null>({
        query: (url) => `${url}${apiKey}`,
      }),
  }),
})
export const { useLazyGetTickersQuery, useLazyGetNextPageTickersQuery, useLazyGetSearchedTickersQuery } = exploreApi;