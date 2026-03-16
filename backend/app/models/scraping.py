from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any
from uuid import UUID


class ScrapingJob(BaseModel):
    id: UUID
    status: str  # PENDING, RUNNING, COMPLETED, FAILED
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    funds_scraped: int = 0
    changes_detected: int = 0
    errors: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True


class ScrapingTrigger(BaseModel):
    manual: bool = True
    funds_to_scrape: Optional[list[UUID]] = None  # None = all funds


class ScrapingStatus(BaseModel):
    is_running: bool
    current_job: Optional[ScrapingJob] = None
    last_run: Optional[datetime] = None
    next_scheduled_run: Optional[datetime] = None
