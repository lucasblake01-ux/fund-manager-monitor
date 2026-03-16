import { httpClient } from './http';
import { ApiResponse } from '../types/api';

export const healthService = {
  check: () => httpClient.get<ApiResponse<{ status: string; service: string; version: string }>>('/health'),
};
