import { httpClient } from './http';
import { ScrapingJob, ScrapingStatus, ScrapingTrigger } from '../types/scraping';
import { ApiResponse, PaginatedResponse } from '../types/api';

const BASE_PATH = '/scraping';

export const scrapingService = {
  trigger: (data: ScrapingTrigger) =>
    httpClient.post<ApiResponse<ScrapingJob>>(`${BASE_PATH}/run`, data),

  getStatus: () =>
    httpClient.get<ApiResponse<ScrapingStatus>>(`${BASE_PATH}/status`),

  getHistory: (limit: number = 10) =>
    httpClient.get<PaginatedResponse<ScrapingJob>>(`${BASE_PATH}/history`, {
      params: { limit },
    }),

  cancel: () =>
    httpClient.post<ApiResponse<{ message: string }>>(`${BASE_PATH}/cancel`),
};
