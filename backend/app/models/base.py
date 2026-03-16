from typing import Generic, TypeVar, Optional, Dict, Any, List
from pydantic import BaseModel

T = TypeVar('T')


class BaseResponse(BaseModel, Generic[T]):
    success: bool
    data: T
    error: Optional[Dict[str, Any]] = None


class PaginatedResponse(BaseModel, Generic[T]):
    success: bool
    data: List[T]
    meta: Dict[str, Any]


class ErrorResponse(BaseModel):
    success: bool = False
    error: Dict[str, Any]
