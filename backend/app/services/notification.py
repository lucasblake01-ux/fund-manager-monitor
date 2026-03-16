from typing import List
from app.models.change import Change
from app.models.user import User
from app.services import user as user_service
from app.services import change as change_service


async def send_change_notification(change: Change, users: List[User]) -> bool:
    """
    Send notification about a change to users

    For prototype: Just logs the notification
    TODO: Implement actual email sending using SMTP/SendGrid/SES
    """
    if not users:
        return False

    print(f"[NOTIFICATION] Change detected: {change.change_type}")
    print(f"[NOTIFICATION] Manager: {change.manager_name}")
    print(f"[NOTIFICATION] Fund ID: {change.fund_id}")
    print(f"[NOTIFICATION] Would notify {len(users)} users:")
    for user in users:
        print(f"  - {user.email}")

    # Mark change as notified
    await change_service.mark_as_notified(change.id)

    return True


async def send_daily_digest(users: List[User], changes: List[Change]) -> bool:
    """
    Send daily digest email to users

    For prototype: Just logs the digest
    TODO: Implement actual email sending
    """
    if not users or not changes:
        return False

    print(f"[DAILY DIGEST] Sending digest with {len(changes)} changes to {len(users)} users")

    return True


async def notify_new_changes() -> int:
    """
    Notify users about new (unnotified) changes
    Returns the number of notifications sent
    """
    unnotified_changes = await change_service.get_unnotified()
    if not unnotified_changes:
        return 0

    active_users = await user_service.get_active_users()
    if not active_users:
        return 0

    notifications_sent = 0
    for change in unnotified_changes:
        success = await send_change_notification(change, active_users)
        if success:
            notifications_sent += 1

    return notifications_sent
