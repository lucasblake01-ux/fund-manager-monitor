import { httpClient } from './http';
import { Change, ChangeWithFund } from '../types/change';
import { ApiResponse, PaginatedResponse } from '../types/api';

const BASE_PATH = '/changes';

export const changeService = {
  getAll: (limit: number = 100, offset: number = 0) =>
    httpClient.get<PaginatedResponse<ChangeWithFund>>(BASE_PATH, {
      params: { limit, offset },
    }),

  getRecent: (days: number = 7) =>
    httpClient.get<PaginatedResponse<ChangeWithFund>>(`${BASE_PATH}/recent`, {
      params: { days },
    }),

  getByFund: (fundId: string) =>
    httpClient.get<PaginatedResponse<Change>>(`${BASE_PATH}/fund/${fundId}`),

  getStatistics: () =>
    httpClient.get<ApiResponse<{
      total_changes: number;
      recent_changes_30d: number;
      unnotified_changes: number;
      changes_by_type: Record<string, number>;
    }>>(`${BASE_PATH}/statistics`),
};
