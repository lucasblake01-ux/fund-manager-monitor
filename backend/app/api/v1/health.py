from fastapi import APIRouter
from app.models.base import BaseResponse

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
async def health_check():
    """Health check endpoint"""
    return BaseResponse(
        success=True,
        data={
            "status": "healthy",
            "service": "Fund Manager Monitor API",
            "version": "1.0.0"
        }
    )
