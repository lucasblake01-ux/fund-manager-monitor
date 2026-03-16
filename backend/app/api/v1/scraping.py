from fastapi import APIRouter, HTTPException
from app.models.scraping import ScrapingJob, ScrapingStatus, ScrapingTrigger
from app.models.base import BaseResponse, PaginatedResponse
from app.services import scraping as scraping_service

router = APIRouter(prefix="/scraping", tags=["scraping"])


@router.post("/run", response_model=BaseResponse[ScrapingJob])
async def trigger_scraping(trigger: ScrapingTrigger):
    """Manually trigger a scraping job"""
    try:
        job = await scraping_service.trigger_scraping(trigger)
        return BaseResponse(success=True, data=job)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.get("/status", response_model=BaseResponse[ScrapingStatus])
async def get_scraping_status():
    """Get current scraping status"""
    status = await scraping_service.get_status()
    return BaseResponse(success=True, data=status)


@router.get("/history", response_model=PaginatedResponse[ScrapingJob])
async def get_scraping_history(limit: int = 10):
    """Get scraping job history"""
    jobs = await scraping_service.get_history(limit=limit)
    return PaginatedResponse(
        success=True,
        data=jobs,
        meta={"total": len(jobs), "page": 1, "per_page": limit}
    )


@router.post("/cancel", response_model=BaseResponse[dict])
async def cancel_scraping():
    """Cancel the currently running scraping job"""
    success = await scraping_service.cancel_current_job()
    if not success:
        raise HTTPException(status_code=404, detail="No running job to cancel")
    return BaseResponse(
        success=True,
        data={"message": "Scraping job cancelled"}
    )
