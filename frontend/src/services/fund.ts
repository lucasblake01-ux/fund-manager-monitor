import { httpClient } from './http';
import { Fund, CreateFundRequest, UpdateFundRequest, FundSource, CreateFundSourceRequest } from '../types/fund';
import { ApiResponse, PaginatedResponse } from '../types/api';

const BASE_PATH = '/funds';

export const fundService = {
  getAll: (search?: string) =>
    httpClient.get<PaginatedResponse<Fund>>(BASE_PATH, {
      params: search ? { search } : undefined,
    }),

  getById: (id: string) =>
    httpClient.get<ApiResponse<Fund>>(`${BASE_PATH}/${id}`),

  create: (data: CreateFundRequest) =>
    httpClient.post<ApiResponse<Fund>>(BASE_PATH, data),

  bulkImport: (funds: CreateFundRequest[]) =>
    httpClient.post<ApiResponse<Fund[]>>(`${BASE_PATH}/bulk`, { funds }),

  update: (id: string, data: UpdateFundRequest) =>
    httpClient.patch<ApiResponse<Fund>>(`${BASE_PATH}/${id}`, data),

  delete: (id: string) =>
    httpClient.delete(`${BASE_PATH}/${id}`),

  getStatistics: () =>
    httpClient.get<ApiResponse<{ total_funds: number; funds_with_sources: number; total_sources: number }>>(`${BASE_PATH}/statistics`),

  getSources: (fundId: string) =>
    httpClient.get<PaginatedResponse<FundSource>>(`${BASE_PATH}/${fundId}/sources`),

  addSource: (fundId: string, data: CreateFundSourceRequest) =>
    httpClient.post<ApiResponse<FundSource>>(`${BASE_PATH}/${fundId}/sources`, data),

  deleteSource: (sourceId: string) =>
    httpClient.delete(`${BASE_PATH}/sources/${sourceId}`),
};
