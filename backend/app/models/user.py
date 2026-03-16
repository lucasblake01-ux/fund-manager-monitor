from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
from uuid import UUID


class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    is_active: Optional[bool] = None


class User(UserBase):
    id: UUID
    is_active: bool = True
    created_at: datetime

    class Config:
        from_attributes = True


class NotificationPreference(BaseModel):
    user_id: UUID
    notify_on_change: bool = True
    daily_digest: bool = False
    digest_time: str = "09:00"  # HH:MM format
