from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from uuid import UUID


class FundBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    isin: Optional[str] = Field(None, max_length=12)
    description: Optional[str] = None
    tags: Optional[str] = None  # Comma-separated


class FundCreate(FundBase):
    pass


class FundUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    isin: Optional[str] = Field(None, max_length=12)
    description: Optional[str] = None
    tags: Optional[str] = None


class Fund(FundBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class FundBulkImport(BaseModel):
    funds: List[FundCreate]


class FundSource(BaseModel):
    id: UUID
    fund_id: UUID
    source_type: str  # CITYWIRE, COMPANY_SITE, GOOGLE
    source_url: str
    last_scraped: Optional[datetime] = None
    is_active: bool = True
    created_at: datetime

    class Config:
        from_attributes = True


class FundSourceCreate(BaseModel):
    fund_id: UUID
    source_type: str
    source_url: str
