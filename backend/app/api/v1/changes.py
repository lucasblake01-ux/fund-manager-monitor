from fastapi import APIRouter, HTTPException, Query
from uuid import UUID
from typing import Optional
from app.models.change import Change, ChangeWithFund
from app.models.base import BaseResponse, PaginatedResponse
from app.services import change as change_service

router = APIRouter(prefix="/changes", tags=["changes"])


@router.get("", response_model=PaginatedResponse[ChangeWithFund])
async def list_changes(
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0)
):
    """List all changes with pagination"""
    changes = await change_service.get_with_fund_details(limit=limit)
    return PaginatedResponse(
        success=True,
        data=changes[offset:offset + limit],
        meta={
            "total": len(changes),
            "page": (offset // limit) + 1,
            "per_page": limit
        }
    )


@router.get("/recent", response_model=PaginatedResponse[ChangeWithFund])
async def get_recent_changes(
    days: int = Query(7, ge=1, le=365, description="Number of days to look back")
):
    """Get recent changes within specified days"""
    changes = await change_service.get_recent(days=days)

    # Get fund details
    changes_with_fund = []
    for change in changes:
        from app.services import fund as fund_service
        fund = await fund_service.get_by_id(change.fund_id)
        if fund:
            change_with_fund = ChangeWithFund(
                **change.model_dump(),
                fund_name=fund.name,
                fund_isin=fund.isin
            )
            changes_with_fund.append(change_with_fund)

    return PaginatedResponse(
        success=True,
        data=changes_with_fund,
        meta={"total": len(changes_with_fund), "days": days}
    )


@router.get("/statistics", response_model=BaseResponse[dict])
async def get_change_statistics():
    """Get change statistics"""
    stats = await change_service.get_statistics()
    return BaseResponse(success=True, data=stats)


@router.get("/fund/{fund_id}", response_model=PaginatedResponse[Change])
async def list_fund_changes(fund_id: UUID):
    """Get all changes for a specific fund"""
    from app.services import fund as fund_service
    fund = await fund_service.get_by_id(fund_id)
    if not fund:
        raise HTTPException(status_code=404, detail="Fund not found")

    changes = await change_service.get_by_fund(fund_id)
    return PaginatedResponse(
        success=True,
        data=changes,
        meta={"total": len(changes), "fund_id": str(fund_id)}
    )
