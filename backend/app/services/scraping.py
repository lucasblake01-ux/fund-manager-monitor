from uuid import UUID, uuid4
from datetime import datetime
from typing import Optional, List
import asyncio
from app.models.scraping import ScrapingJob, ScrapingStatus, ScrapingTrigger
from app.services import fund as fund_service
from app.services import change as change_service
from app.models.change import ChangeCreate

# In-memory storage
_jobs: dict[UUID, ScrapingJob] = {}
_current_job: Optional[ScrapingJob] = None
_is_running: bool = False


async def get_status() -> ScrapingStatus:
    """Get current scraping status"""
    last_run = None
    if _jobs:
        sorted_jobs = sorted(_jobs.values(), key=lambda x: x.started_at or datetime.min, reverse=True)
        if sorted_jobs and sorted_jobs[0].completed_at:
            last_run = sorted_jobs[0].completed_at

    return ScrapingStatus(
        is_running=_is_running,
        current_job=_current_job,
        last_run=last_run,
        next_scheduled_run=None  # TODO: implement with scheduler
    )


async def get_history(limit: int = 10) -> List[ScrapingJob]:
    """Get scraping job history"""
    sorted_jobs = sorted(
        _jobs.values(),
        key=lambda x: x.started_at or datetime.min,
        reverse=True
    )
    return sorted_jobs[:limit]


async def trigger_scraping(trigger: ScrapingTrigger) -> ScrapingJob:
    """Trigger a scraping job"""
    global _current_job, _is_running

    if _is_running:
        raise ValueError("Scraping job already running")

    # Create job
    job = ScrapingJob(
        id=uuid4(),
        status="PENDING",
        started_at=None,
        completed_at=None,
        funds_scraped=0,
        changes_detected=0,
        metadata={"manual": trigger.manual}
    )
    _jobs[job.id] = job
    _current_job = job

    # Start scraping in background
    asyncio.create_task(_run_scraping_job(job, trigger))

    return job


async def _run_scraping_job(job: ScrapingJob, trigger: ScrapingTrigger):
    """Run the actual scraping job (background task)"""
    global _current_job, _is_running

    try:
        _is_running = True
        job.status = "RUNNING"
        job.started_at = datetime.utcnow()

        # Get funds to scrape
        if trigger.funds_to_scrape:
            funds = [await fund_service.get_by_id(fid) for fid in trigger.funds_to_scrape]
            funds = [f for f in funds if f is not None]
        else:
            funds = await fund_service.get_all()

        job.funds_scraped = len(funds)

        # Simulate scraping (replace with actual scraping logic)
        changes_detected = 0
        for fund in funds:
            # TODO: Implement actual web scraping here
            # For now, simulate with a small delay
            await asyncio.sleep(0.1)

            # Simulate finding a change (for demo purposes)
            if len(funds) > 0 and funds[0].id == fund.id:
                # Create a sample change for the first fund
                change_data = ChangeCreate(
                    fund_id=fund.id,
                    change_type="MANAGER_JOINED",
                    manager_name="John Smith",
                    detected_date=datetime.utcnow(),
                    source_name="CITYWIRE",
                    source_url="https://citywire.com/example",
                    raw_data="Sample change data"
                )
                await change_service.create(change_data)
                changes_detected += 1

        job.changes_detected = changes_detected
        job.status = "COMPLETED"
        job.completed_at = datetime.utcnow()

    except Exception as e:
        job.status = "FAILED"
        job.errors = str(e)
        job.completed_at = datetime.utcnow()

    finally:
        _is_running = False
        _current_job = None


async def cancel_current_job() -> bool:
    """Cancel the currently running job"""
    global _is_running, _current_job

    if not _is_running or not _current_job:
        return False

    _current_job.status = "CANCELLED"
    _current_job.completed_at = datetime.utcnow()
    _is_running = False
    _current_job = None
    return True
