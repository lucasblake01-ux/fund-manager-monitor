import { httpClient } from './http';
import { User, SubscribeRequest, UnsubscribeRequest } from '../types/user';
import { ApiResponse, PaginatedResponse } from '../types/api';

const BASE_PATH = '/users';

export const userService = {
  subscribe: (data: SubscribeRequest) =>
    httpClient.post<ApiResponse<User>>(`${BASE_PATH}/subscribe`, data),

  unsubscribe: (data: UnsubscribeRequest) =>
    httpClient.post<ApiResponse<{ message: string }>>(`${BASE_PATH}/unsubscribe`, data),

  getAll: () =>
    httpClient.get<PaginatedResponse<User>>(BASE_PATH),
};
