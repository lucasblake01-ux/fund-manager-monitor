from uuid import UUID, uuid4
from datetime import datetime
from typing import List, Optional
from app.models.fund import Fund, FundCreate, FundUpdate, FundSource, FundSourceCreate

# In-memory storage (prototype - replace with SQLite/PostgreSQL later)
_funds: dict[UUID, Fund] = {}
_fund_sources: dict[UUID, FundSource] = {}


async def get_all() -> List[Fund]:
    """Get all funds"""
    return sorted(list(_funds.values()), key=lambda x: x.name)


async def get_by_id(id: UUID) -> Optional[Fund]:
    """Get fund by ID"""
    return _funds.get(id)


async def search(query: str) -> List[Fund]:
    """Search funds by name"""
    query_lower = query.lower()
    return [
        fund for fund in _funds.values()
        if query_lower in fund.name.lower()
    ]


async def create(data: FundCreate) -> Fund:
    """Create a new fund"""
    fund = Fund(
        id=uuid4(),
        **data.model_dump(),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    _funds[fund.id] = fund
    return fund


async def create_many(funds: List[FundCreate]) -> List[Fund]:
    """Bulk create funds"""
    created_funds = []
    for fund_data in funds:
        fund = await create(fund_data)
        created_funds.append(fund)
    return created_funds


async def update(id: UUID, data: FundUpdate) -> Optional[Fund]:
    """Update a fund"""
    if id not in _funds:
        return None
    fund = _funds[id]
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(fund, field, value)
    fund.updated_at = datetime.utcnow()
    return fund


async def delete(id: UUID) -> bool:
    """Delete a fund"""
    if id in _funds:
        # Also delete associated sources
        sources_to_delete = [
            source_id for source_id, source in _fund_sources.items()
            if source.fund_id == id
        ]
        for source_id in sources_to_delete:
            del _fund_sources[source_id]
        del _funds[id]
        return True
    return False


async def get_sources(fund_id: UUID) -> List[FundSource]:
    """Get all sources for a fund"""
    return [
        source for source in _fund_sources.values()
        if source.fund_id == fund_id
    ]


async def add_source(data: FundSourceCreate) -> FundSource:
    """Add a source URL to a fund"""
    source = FundSource(
        id=uuid4(),
        **data.model_dump(),
        created_at=datetime.utcnow()
    )
    _fund_sources[source.id] = source
    return source


async def delete_source(source_id: UUID) -> bool:
    """Delete a fund source"""
    if source_id in _fund_sources:
        del _fund_sources[source_id]
        return True
    return False


async def get_statistics() -> dict:
    """Get fund statistics"""
    return {
        "total_funds": len(_funds),
        "funds_with_sources": len(set(s.fund_id for s in _fund_sources.values())),
        "total_sources": len(_fund_sources)
    }
