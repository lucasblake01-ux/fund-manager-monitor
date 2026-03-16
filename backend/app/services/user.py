from uuid import UUID, uuid4
from datetime import datetime
from typing import List, Optional
from app.models.user import User, UserCreate, UserUpdate

# In-memory storage
_users: dict[UUID, User] = {}


async def get_all() -> List[User]:
    """Get all users"""
    return list(_users.values())


async def get_by_id(id: UUID) -> Optional[User]:
    """Get user by ID"""
    return _users.get(id)


async def get_by_email(email: str) -> Optional[User]:
    """Get user by email"""
    for user in _users.values():
        if user.email.lower() == email.lower():
            return user
    return None


async def create(data: UserCreate) -> User:
    """Create a new user (subscribe)"""
    # Check if email already exists
    existing = await get_by_email(data.email)
    if existing:
        # Reactivate if inactive
        if not existing.is_active:
            existing.is_active = True
        return existing

    user = User(
        id=uuid4(),
        **data.model_dump(),
        is_active=True,
        created_at=datetime.utcnow()
    )
    _users[user.id] = user
    return user


async def update(id: UUID, data: UserUpdate) -> Optional[User]:
    """Update a user"""
    if id not in _users:
        return None
    user = _users[id]
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    return user


async def unsubscribe(email: str) -> bool:
    """Unsubscribe user by email"""
    user = await get_by_email(email)
    if user:
        user.is_active = False
        return True
    return False


async def delete(id: UUID) -> bool:
    """Delete a user"""
    if id in _users:
        del _users[id]
        return True
    return False


async def get_active_users() -> List[User]:
    """Get all active users for notifications"""
    return [user for user in _users.values() if user.is_active]
