from uuid import UUID, uuid4
from datetime import datetime, timedelta
from typing import List, Optional
from app.models.change import Change, ChangeCreate, ChangeWithFund
from app.services import fund as fund_service

# In-memory storage
_changes: dict[UUID, Change] = {}


async def get_all(limit: int = 100, offset: int = 0) -> List[Change]:
    """Get all changes with pagination"""
    all_changes = sorted(
        list(_changes.values()),
        key=lambda x: x.detected_date,
        reverse=True
    )
    return all_changes[offset:offset + limit]


async def get_recent(days: int = 7) -> List[Change]:
    """Get recent changes within specified days"""
    cutoff_date = datetime.utcnow() - timedelta(days=days)
    return [
        change for change in _changes.values()
        if change.detected_date >= cutoff_date
    ]


async def get_by_fund(fund_id: UUID) -> List[Change]:
    """Get all changes for a specific fund"""
    return sorted(
        [change for change in _changes.values() if change.fund_id == fund_id],
        key=lambda x: x.detected_date,
        reverse=True
    )


async def get_with_fund_details(limit: int = 100) -> List[ChangeWithFund]:
    """Get changes with fund details"""
    changes = await get_all(limit=limit)
    changes_with_fund = []

    for change in changes:
        fund = await fund_service.get_by_id(change.fund_id)
        if fund:
            change_with_fund = ChangeWithFund(
                **change.model_dump(),
                fund_name=fund.name,
                fund_isin=fund.isin
            )
            changes_with_fund.append(change_with_fund)

    return changes_with_fund


async def create(data: ChangeCreate) -> Change:
    """Create a new change record"""
    change = Change(
        id=uuid4(),
        **data.model_dump(),
        is_notified=False,
        created_at=datetime.utcnow()
    )
    _changes[change.id] = change
    return change


async def mark_as_notified(change_id: UUID) -> Optional[Change]:
    """Mark a change as notified"""
    if change_id not in _changes:
        return None
    change = _changes[change_id]
    change.is_notified = True
    return change


async def get_unnotified() -> List[Change]:
    """Get all unnotified changes"""
    return [
        change for change in _changes.values()
        if not change.is_notified
    ]


async def get_statistics() -> dict:
    """Get change statistics"""
    recent_changes = await get_recent(days=30)
    return {
        "total_changes": len(_changes),
        "recent_changes_30d": len(recent_changes),
        "unnotified_changes": len(await get_unnotified()),
        "changes_by_type": {
            "MANAGER_JOINED": len([c for c in _changes.values() if c.change_type == "MANAGER_JOINED"]),
            "MANAGER_LEFT": len([c for c in _changes.values() if c.change_type == "MANAGER_LEFT"]),
            "MANAGER_CHANGED": len([c for c in _changes.values() if c.change_type == "MANAGER_CHANGED"]),
        }
    }
