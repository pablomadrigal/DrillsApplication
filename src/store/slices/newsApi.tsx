import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsResult } from '../../types/New';

const API_Key = `${import.meta.env.VITE_NEWS_API_KEY}`;

export interface NewsApiProps {
  page: number;
  search: string
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/everything',
    prepareHeaders: (headers) => {
      headers.set('X-Api-Key', `${API_Key}`);
      return headers;
    },
  }),
  tagTypes: ['newsList'],
  endpoints: (build) => ({
    getNewsList: build.query<NewsResult, NewsApiProps>({
      query: ({page, search}) => {
        const params: { [key: string]: string | number } = { language: 'en', sortBy: 'popularity', pageSize: 12, page };
        if (search === '') {
          params['q'] = "bitcoin";
        } else {
          params['q'] = search;
        }
        return {
          url: '',
          params,
        }
      },
    }),
  }),
});

export const { useGetNewsListQuery } = newsApi;
