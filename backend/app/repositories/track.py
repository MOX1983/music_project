from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, join, and_

from app.schemes import UserResponse, TrackResponse as TrackSchema
from app.models import User, Track

async def get_user_tracks(db: AsyncSession, user: UserResponse) -> list[TrackSchema]:
    stmt = select(Track).join(User.tracks).where(User.user_id == user.user_id)
    result = await db.execute(stmt)
    tracks = result.scalars().all()
    return [TrackSchema.model_validate(track) for track in tracks]

async def get_user_one_track(db: AsyncSession, user: UserResponse, track_id) -> TrackSchema:
    slct = (select(Track).join(User.tracks).where(and_(User.user_id == user.user_id, Track.track_id == track_id)))
    result = await db.execute(slct)
    return result.scalars().first()