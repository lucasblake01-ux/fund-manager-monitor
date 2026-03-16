export interface ScrapingJob {
  id: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  started_at?: string;
  completed_at?: string;
  funds_scraped: number;
  changes_detected: number;
  errors?: string;
  metadata?: Record<string, unknown>;
}

export interface ScrapingStatus {
  is_running: boolean;
  current_job?: ScrapingJob;
  last_run?: string;
  next_scheduled_run?: string;
}

export interface ScrapingTrigger {
  manual: boolean;
  funds_to_scrape?: string[];
}
