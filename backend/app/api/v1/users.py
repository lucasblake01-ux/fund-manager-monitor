from fastapi import APIRouter, HTTPException, status
from uuid import UUID
from pydantic import BaseModel, EmailStr
from app.models.user import User, UserCreate
from app.models.base import BaseResponse, PaginatedResponse
from app.services import user as user_service

router = APIRouter(prefix="/users", tags=["users"])


class SubscribeRequest(BaseModel):
    email: EmailStr


class UnsubscribeRequest(BaseModel):
    email: EmailStr


@router.post("/subscribe", response_model=BaseResponse[User], status_code=status.HTTP_201_CREATED)
async def subscribe(data: SubscribeRequest):
    """Subscribe to email notifications"""
    user_data = UserCreate(email=data.email)
    user = await user_service.create(user_data)
    return BaseResponse(
        success=True,
        data=user
    )


@router.post("/unsubscribe", response_model=BaseResponse[dict])
async def unsubscribe(data: UnsubscribeRequest):
    """Unsubscribe from email notifications"""
    success = await user_service.unsubscribe(data.email)
    if not success:
        raise HTTPException(status_code=404, detail="Email not found")
    return BaseResponse(
        success=True,
        data={"message": "Successfully unsubscribed"}
    )


@router.get("", response_model=PaginatedResponse[User])
async def list_users():
    """List all users (admin endpoint)"""
    users = await user_service.get_all()
    return PaginatedResponse(
        success=True,
        data=users,
        meta={"total": len(users), "page": 1, "per_page": 100}
    )
