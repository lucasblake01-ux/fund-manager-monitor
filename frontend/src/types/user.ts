export interface User {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface SubscribeRequest {
  email: string;
}

export interface UnsubscribeRequest {
  email: string;
}
