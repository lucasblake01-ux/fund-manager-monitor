from fastapi import APIRouter, HTTPException, status, Query
from uuid import UUID
from typing import List, Optional
from app.models.fund import Fund, FundCreate, FundUpdate, FundBulkImport, FundSource, FundSourceCreate
from app.models.base import BaseResponse, PaginatedResponse
from app.services import fund as fund_service

router = APIRouter(prefix="/funds", tags=["funds"])


@router.get("", response_model=PaginatedResponse[Fund])
async def list_funds(
    search: Optional[str] = Query(None, description="Search funds by name")
):
    """List all funds with optional search"""
    if search:
        funds = await fund_service.search(search)
    else:
        funds = await fund_service.get_all()

    return PaginatedResponse(
        success=True,
        data=funds,
        meta={"total": len(funds), "page": 1, "per_page": 1000}
    )


@router.post("", response_model=BaseResponse[Fund], status_code=status.HTTP_201_CREATED)
async def create_fund(data: FundCreate):
    """Create a new fund"""
    fund = await fund_service.create(data)
    return BaseResponse(success=True, data=fund)


@router.post("/bulk", response_model=BaseResponse[List[Fund]], status_code=status.HTTP_201_CREATED)
async def bulk_import_funds(data: FundBulkImport):
    """Bulk import funds"""
    funds = await fund_service.create_many(data.funds)
    return BaseResponse(
        success=True,
        data=funds
    )


@router.get("/statistics", response_model=BaseResponse[dict])
async def get_fund_statistics():
    """Get fund statistics"""
    stats = await fund_service.get_statistics()
    return BaseResponse(success=True, data=stats)


@router.get("/{id}", response_model=BaseResponse[Fund])
async def get_fund(id: UUID):
    """Get a specific fund"""
    fund = await fund_service.get_by_id(id)
    if not fund:
        raise HTTPException(status_code=404, detail="Fund not found")
    return BaseResponse(success=True, data=fund)


@router.patch("/{id}", response_model=BaseResponse[Fund])
async def update_fund(id: UUID, data: FundUpdate):
    """Update a fund"""
    fund = await fund_service.update(id, data)
    if not fund:
        raise HTTPException(status_code=404, detail="Fund not found")
    return BaseResponse(success=True, data=fund)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_fund(id: UUID):
    """Delete a fund"""
    if not await fund_service.delete(id):
        raise HTTPException(status_code=404, detail="Fund not found")


@router.get("/{id}/sources", response_model=PaginatedResponse[FundSource])
async def list_fund_sources(id: UUID):
    """List all sources for a fund"""
    fund = await fund_service.get_by_id(id)
    if not fund:
        raise HTTPException(status_code=404, detail="Fund not found")

    sources = await fund_service.get_sources(id)
    return PaginatedResponse(
        success=True,
        data=sources,
        meta={"total": len(sources), "page": 1, "per_page": 100}
    )


@router.post("/{id}/sources", response_model=BaseResponse[FundSource], status_code=status.HTTP_201_CREATED)
async def add_fund_source(id: UUID, data: FundSourceCreate):
    """Add a source URL to a fund"""
    fund = await fund_service.get_by_id(id)
    if not fund:
        raise HTTPException(status_code=404, detail="Fund not found")

    if data.fund_id != id:
        raise HTTPException(status_code=400, detail="Fund ID mismatch")

    source = await fund_service.add_source(data)
    return BaseResponse(success=True, data=source)


@router.delete("/sources/{source_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_fund_source(source_id: UUID):
    """Delete a fund source"""
    if not await fund_service.delete_source(source_id):
        raise HTTPException(status_code=404, detail="Source not found")
