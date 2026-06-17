from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, join, and_

from app.schemes import UserBase, Track as TrackSchema
from app.models import User, Track, users_tracks

async def get_user_tracks(db: AsyncSession, user: User) -> list[TrackSchema]:
    slct = (select(Track).join(users_tracks, users_tracks.track_id == Track.track_id)
            .where(users_tracks.user_id == user.user_id))
    result = await db.execute(slct)
    tracks = result.scalars().all()
    return [TrackSchema.model_validate(track) for track in tracks]

async def get_user_one_track(db: AsyncSession, user: User, track_id) -> TrackSchema:
    slct = (select(Track).join(users_tracks, users_tracks.track_id == Track.track_id)
            .where(and_(users_tracks.user_id == user.user_id, users_tracks.track_id == track_id)))
    result = await db.execute(slct)
    return result.scalars().first()