from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from uuid import UUID


class ChangeBase(BaseModel):
    fund_id: UUID
    change_type: str  # MANAGER_JOINED, MANAGER_LEFT, MANAGER_CHANGED
    manager_name: str = Field(..., min_length=1, max_length=200)
    previous_manager: Optional[str] = None
    detected_date: datetime
    source_name: str  # CITYWIRE, COMPANY_SITE, GOOGLE
    source_url: Optional[str] = None
    raw_data: Optional[str] = None


class ChangeCreate(ChangeBase):
    pass


class Change(ChangeBase):
    id: UUID
    is_notified: bool = False
    created_at: datetime

    class Config:
        from_attributes = True


class ChangeWithFund(Change):
    fund_name: str
    fund_isin: Optional[str] = None
