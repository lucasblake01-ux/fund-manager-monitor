export interface Change {
  id: string;
  fund_id: string;
  change_type: 'MANAGER_JOINED' | 'MANAGER_LEFT' | 'MANAGER_CHANGED';
  manager_name: string;
  previous_manager?: string;
  detected_date: string;
  source_name: string;
  source_url?: string;
  raw_data?: string;
  is_notified: boolean;
  created_at: string;
}

export interface ChangeWithFund extends Change {
  fund_name: string;
  fund_isin?: string;
}
