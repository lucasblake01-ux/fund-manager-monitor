export interface Fund {
  id: string;
  name: string;
  isin?: string;
  description?: string;
  tags?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateFundRequest {
  name: string;
  isin?: string;
  description?: string;
  tags?: string;
}

export interface UpdateFundRequest {
  name?: string;
  isin?: string;
  description?: string;
  tags?: string;
}

export interface FundSource {
  id: string;
  fund_id: string;
  source_type: string;
  source_url: string;
  last_scraped?: string;
  is_active: boolean;
  created_at: string;
}

export interface CreateFundSourceRequest {
  fund_id: string;
  source_type: string;
  source_url: string;
}
